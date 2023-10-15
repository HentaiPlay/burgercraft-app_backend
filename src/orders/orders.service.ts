import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { difference } from 'lodash'
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { BurgersService } from 'src/burgers/burgers.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderListElement } from './types/order.types';
import { StatusType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => BurgersService))
    private burgersService: BurgersService,
    private productsService: ProductsService
  ) {}

  // Получение списка заказов (проданных или непроданных)
  async getOrderList (
    crafterId: number,
    isSaled: boolean
  ): Promise<Array<OrderListElement>> {
    return await this.prisma.order.findMany({
      where: {
        crafterId: crafterId,
        isSaled: isSaled
      },
      select: {
        id: true,
        code: true,
        status: true,
        updatedAt: true
      }
    })
  }

  // Получение данных заказа по ID
  async getOrderById (id: number, crafterId: number): Promise<Order> {
    const orderData = await this.prisma.order.findFirstOrThrow({
      where: { id, crafterId: crafterId },
      select: {
        id: true,
        price: true,
        code: true,
        status: true,
        isSaled: true,
        burger: {
          select: {
            burgerIngredient: true
          }
        },
        ordersProducts: true
      }
    })
    const productsId = orderData.ordersProducts.map(item => item.productId)
    const burgers = await this.burgersService.getAllByOrderId(id)
    const products = await this.prisma.product.findMany({
      where: { id: { in: productsId } },
      select: {
        id: true,
        type: true,
        slug: true,
        photoPath: true,
        price: true
      }
    })
    const order: Order = {
      id: id,
      price: orderData.price,
      code: orderData.code,
      status: orderData.status,
      isSaled: orderData.isSaled,
      burgers: burgers,
      products: products
    }
    return order
  }

  async createOrder (orderData: CreateOrderDto): Promise<void> {

    let totalPrice = 0;
    const burgersData = [];
    const orderProductsData = [];

    // Валидация ингредиентов
    orderData.burgers.forEach(burger => {
      this.burgersService.validateIngredients(burger.ingredients)
    })

    // Расчет стоимости всех бургеров и форматирование для записи
    for (const burger of orderData.burgers) {
      const burgerPrice = await this.burgersService.countPrice(burger.ingredients)
      totalPrice += burgerPrice
      burgersData.push({
        price: burgerPrice,
        ingredients: burger.ingredients
      })
    }

    // Расчет стоимости всех продуктов и форматирование для записи
    for (const product of orderData.ordersProducts) {
      const productPrice = await this.productsService.getPrice(product.id)
      totalPrice += productPrice
      orderProductsData.push({
        productId: product.id
      })
    }

    // Формирование кода заказа
    const code = this.generateOrderCode()

    // Создание заказа
    const order = await this.prisma.order.create({
      data: {
        price: totalPrice,
        crafterId: orderData.crafterId,
        code: code,
        status: StatusType.accepted,
        ordersProducts: {
          createMany: {
            data: orderProductsData
          }
        }
      }
    })

    // Создание бургеров
    for (const burgerData of burgersData) {
      burgerData.orderId = order.id
      await this.burgersService.createBurger(burgerData)
    }
  }

  // Пересчет суммы заказа, после изменения бургера в заказе
  async updatePriceOrder (
    orderId: number,
    oldBurgerPrice: number,
    newBurgerPrice: number
  ): Promise<void> {
    const order = await this.prisma.order.findFirstOrThrow({
      where: { id: orderId },
      select: { price: true }
    })
    const newOrderPrice = order.price - oldBurgerPrice + newBurgerPrice
    await this.prisma.order.update({
      where: { id: orderId },
      data: { price: newOrderPrice }
    })
  }

  // Редактирование заказа (кроме бургеров)
  async updateOrder (orderData: UpdateOrderDto): Promise<Order> {
    const oldOrder = await this.getOrderById(orderData.id, orderData.crafterId)

    const oldProductsId = oldOrder.products.map(item => item.id)
    const newOldProductsId = orderData.ordersProducts.map(item => item.id)
    const hasChangesProducts = difference(oldProductsId, newOldProductsId)

    if (hasChangesProducts) {
      const ordersProductsData = orderData.ordersProducts.map(product => ({
        orderId: orderData.id,
        productId: product.id
      }))
      // TODO оптимизировать удаление записей и создание новых
      await this.prisma.ordersProducts.deleteMany({ where: { orderId: orderData.id } })
      await this.prisma.ordersProducts.createMany({ data: ordersProductsData })

      let newTotalPrice = 0;

      // Расчет стоимости всех бургеров и форматирование для записи
      const burgers = await this.burgersService.getAllByOrderId(orderData.id)
      for (const burger of burgers) {
        newTotalPrice += burger.price
      }

      // Расчет стоимости всех продуктов
      for (const product of orderData.ordersProducts) {
        const productPrice = await this.productsService.getPrice(product.id)
        newTotalPrice += productPrice
      }

      // Обновление стоимости заказа
      await this.prisma.order.update({
        where: { id: orderData.id },
        data: { price: newTotalPrice }
      })
    }

    return await this.getOrderById(orderData.id, orderData.crafterId)
  }

  async saleOrder (id: number): Promise<void> {
    // TODO добавить обновления для статистики с передачей суммы заказа
    await this.prisma.order.update({
      where: { id },
      data: { isSaled: true }
    })
  }

  // Генерация номера заказа
  private generateOrderCode (): string {
    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
    const randomNumber = Math.floor(Math.random() * 2599);
    const letter = alphabet[Math.floor(randomNumber / 100)].toUpperCase()
    const code = (randomNumber % 100).toString().padStart(2, '0')
    return `${letter}-${code}`
  }
}
