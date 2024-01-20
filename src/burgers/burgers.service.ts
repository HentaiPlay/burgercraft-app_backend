import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { BurgerIngredientDto } from './dto/burger-ingredients.dto';
import { Brioche, BurgerIngredientOptions, ProductTypes } from 'src/products/types/products.types';
import { Burger } from './types/burgers.types';
import { UpdateBurgerDto } from './dto/update-burger.dto';
import { OrdersService } from 'src/orders/orders.service';
import { difference } from 'lodash'

@Injectable()
export class BurgersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
  ) {}

  // Получение бургера по ID
  async findById(id: number) {
    const burgerData = await this.prisma.burger.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        price: true,
        orderId: true,
        burgerIngredient: {
          select: {
            ingredientId: true
          }
        }
      }
    })
    const ingredientsId = burgerData.burgerIngredient.map(item => item.ingredientId)
    const ingredients = await this.prisma.product.findMany({
      where: {
        id: { in: ingredientsId },
        type: ProductTypes.burgerIngredient
      }
    })
    
    const burger: Burger = {
      id: burgerData.id,
      price: burgerData.price,
      ingredients: ingredients,
      orderId: burgerData.orderId
    }
    return burger
  }

  // Получение всех бургеров по ID заказа
  async getAllByOrderId (orderId: number): Promise<Array<Burger>> {
    const burgersData = await this.prisma.burger.findMany({
      where: { orderId: orderId },
      select: {
        id: true,
        price: true,
        orderId: true,
        burgerIngredient: {
          select: {
            id: true,
            ingredientId: true
          }
        }
      }
    })
    const burgers: Array<Burger> = []
    for (const burger of burgersData) {
      const ingredients: Array<BurgerIngredientOptions> = await this.getAllIngredients(burger.burgerIngredient)
      burgers.push({
        id: burger.id,
        price: burger.price,
        orderId: burger.orderId,
        ingredients: ingredients
      })
    }
    return burgers
  }

  // Создание бургера
  async createBurger(burgerDto: CreateBurgerDto): Promise<void> {
    // Определение типа создания
    // (бургер создан при создании заказа или при редактировании заказа)
    const isEditOrder = Boolean(!burgerDto.price)

    // Определение стоимости
    const price = isEditOrder
      ? await this.countPrice(burgerDto.ingredients)
      : burgerDto.price

    const ingredientsData = []
    for (const ingredient of burgerDto.ingredients) {
      ingredientsData.push({ ingredientId: ingredient.id })
    }
    // Форсирование бага с уникальными id
    // https://github.com/prisma/prisma/discussions/5256
    await this.prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"burgers"', 'id'), coalesce(max(id)+1, 1), false) FROM "burgers";`;

    // Сохранение бургера
    await this.prisma.burger.create({
      data: {
        price: price,
        orderId: burgerDto.orderId,
        burgerIngredient: {
          createMany: {
            data: ingredientsData
          }
        }
      }
    });

    // Перерасчет стоимости заказа, если он бургер добавлен при редактировании заказа
    if (isEditOrder) {
      await this.ordersService.updatePriceOrder(burgerDto.orderId, 0, price)
    }
  }

  // Редактирование бургера (с обновлением стоимости заказа)
  async updateBurger (burgerDto: UpdateBurgerDto): Promise<void> {
    const burger = await this.findById(burgerDto.id)
    const oldPrice = burger.price
    if (!burger) throw new HttpException('Бургер не существует', HttpStatus.BAD_REQUEST);

    const oldIngredients = burger.ingredients.map(ingredient => ingredient.id)
    const newIngredients = burgerDto.ingredients.map(ingredient => ingredient.id)
    const hasChangesIngredients = difference(oldIngredients, newIngredients)

    if (hasChangesIngredients) {
      this.validateIngredients(burgerDto.ingredients)
      const ingredientsData = burgerDto.ingredients.map(ingredient => ({
        burgerId: burgerDto.id,
        ingredientId: ingredient.id
      }))

      // TODO оптимизировать удаление записей и создание новых
      await this.prisma.burgerIngredient.deleteMany({ where: { burgerId: burgerDto.id } })
      await this.prisma.burgerIngredient.createMany({ data: ingredientsData })
    }

    const newPrice = await this.countPrice(burgerDto.ingredients);
    await this.prisma.burger.update({
      where: { id: burgerDto.id },
      data: {
        price: newPrice
      }
    });
    await this.ordersService.updatePriceOrder(burger.orderId, oldPrice, newPrice)
  }

  // Удаление бургера (с обновлением стоимости заказа)
  async deleteBurger(burgerId: number): Promise<void> {
    const burger = await this.prisma.burger.findFirstOrThrow({
      where: { id: burgerId },
      select: {
        price: true,
        orderId: true
      }
    })
    
    const order = await this.prisma.order.findFirst({
      where: { id: burger.orderId },
      select: {
        burger: true
      }
    })

    // Валидация на "последний бургер" в заказе
    if (order.burger.length === 1) {
      throw new HttpException(
        'Нельзя удалить бургер, так как в заказе должен быть хотя бы один',
        HttpStatus.BAD_REQUEST
        );
    }

    // Удаление и перерасчет стоимости заказа
    await this.prisma.burger.delete({ where: { id: burgerId } });
    await this.ordersService.updatePriceOrder(burger.orderId, burger.price, 0)
  }

  // Подсчет стоимости бургера (по стоимости ингредиентов)
  async countPrice(ingredients: BurgerIngredientDto[]): Promise<number> {
    let totalPrice = 0;
    const products = []
    for (const ingredient of ingredients) {
      products.push(await this.prisma.product.findFirst({
        where: { id: ingredient.id },
        select: { price: true }
      }))
    }
    products.forEach((product) => (totalPrice += product.price));
    return totalPrice;
  }

  // Валидация ингредиентов бургера
  validateIngredients (ingredients: Array<BurgerIngredientDto>): void | HttpException {
    const hasBrioches = this.checkBriochesIntoIngredients(ingredients);
    if (!hasBrioches) {
      throw new HttpException('В бургере нет булочек', HttpStatus.BAD_REQUEST);
    }
  }

  // Проверка на наличие булочек в бургере
  private checkBriochesIntoIngredients(ingredients: Array<BurgerIngredientDto>): boolean {
    const brioche = { up: false, down: false };
    ingredients.forEach((ingredient) => {
      if (ingredient.slug === Brioche.up) { brioche.up = true; }
      if (ingredient.slug === Brioche.down) { brioche.down = true; }
    });
    return brioche.up && brioche.down;
  }

  // Получение полного списка ингредиентов
  private async getAllIngredients (burgerIngredient): Promise<BurgerIngredientOptions[]> {
    const ingredients = []
    for (const ingredient of burgerIngredient) {
      ingredients.push(await this.prisma.product.findFirst({
        where: {
          id: ingredient.ingredientId,
          type: ProductTypes.burgerIngredient
        }
      }))
    }
    return ingredients
  }
}
