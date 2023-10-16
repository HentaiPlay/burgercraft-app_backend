import { Seeder } from "../seeder.abstract"
import { burgerIngredients } from "./data/burger-ingredients";
import { drinks } from "./data/drinks";
import { sauces } from "./data/sauces";
import { snacks } from "./data/snacks";
import { generateSlug } from "../../../src/utilities/helpers/slug-generator";

export class ProductsSeeder extends Seeder {
  
  async run () {
    await this.prisma.product.deleteMany();

    const products = [].concat(burgerIngredients, snacks, sauces, drinks)
    products.forEach(product => (product.slug = generateSlug(product.name)))
    await this.prisma.product.createMany({
      data: products
    })
  }
}