import { Seeder } from "../seeder.abstract"
import { burgerIngredients } from "./products/burger-ingredients";
import { drinks } from "./products/drinks";
import { sauces } from "./products/sauces";
import { snacks } from "./products/snacks";
import { generateSlug } from "../../../src/utilities/helpers/slug-generator";

class ProductsSeeder extends Seeder {
  
  async run () {
    await this.prisma.product.deleteMany();

    const products = [].concat(burgerIngredients, snacks, sauces, drinks)
    products.forEach(product => (product.slug = generateSlug(product.name)))
    await this.prisma.product.createMany({
      data: products
    })
  }
}

export { ProductsSeeder }