import { PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder.abstract";
import { RolesSeeder } from "./roles/roles.seeder";
import { UsersSeeder } from "./users/users.seeder";
import { ProductsSeeder } from "./products/products.seeder";

class SeederFactory {
  constructor (protected prisma: PrismaClient) {
    console.log('Start seeding...');
    this.prisma = prisma
  }

  public async run(name: string) {
    let seeder: Seeder
    switch (name) {
      case 'roles': seeder = new RolesSeeder(this.prisma); break;
      case 'users': seeder = new UsersSeeder(this.prisma); break;
      case 'products': seeder = new ProductsSeeder(this.prisma); break;
      default: return
    }
    console.log(`Seeding ${name}...`)
    await seeder.run()
  }
}

export { SeederFactory }