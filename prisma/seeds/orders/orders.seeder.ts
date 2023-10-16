import { Seeder } from "../seeder.abstract"
import { burgers } from "./data/burgers";
import { orders } from "./data/orders";
import { burgersIngredients } from "./data/burgers-ingredients";
import { ordersProducts } from "./data/orders-products";

export class OrdersSeeder extends Seeder {
  
  async run () {
    // Так как каскад, то удалит все таблицы
    await this.prisma.order.deleteMany();
  
    // Сидирование таблицы orders
    await this.prisma.order.createMany({
      data: orders
    })

    // Сидирование таблицы burgers
    await this.prisma.burger.createMany({
      data: burgers
    })

    // Сидирование таблицы burgers_ingredients
    await this.prisma.burgerIngredient.createMany({
      data: burgersIngredients
    })

    // Сидирование таблицы orders_products
    await this.prisma.ordersProducts.createMany({
      data: ordersProducts
    })
  }
}