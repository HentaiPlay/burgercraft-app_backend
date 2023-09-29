import { Seeder } from "../seeder.abstract"
import { burgerIngredients } from "./products/burger-ingredients";
import { drinks } from "./products/drinks";
import { sauces } from "./products/sauces";
import { snacks } from "./products/snacks";

class ProductsSeeder extends Seeder {
  
  async run () {
    await this.prisma.product.deleteMany();

    const products = [].concat(burgerIngredients, snacks, sauces, drinks)
    products.forEach(async item => {
      await this.prisma.product.create({
        data: item
      })
    })

  }
}

export { ProductsSeeder }