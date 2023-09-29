import { PrismaClient } from "@prisma/client";
import { RolesSeeder } from "./models/roles.seeder";

class SeederFactory {
  constructor (protected prisma: PrismaClient) {
    console.log('Start seeding...');
    this.prisma = prisma
  }

  public async run(name: string) {
    let seeder
    switch (name) {
      case 'roles': seeder = new RolesSeeder(this.prisma); break;
      default: return
    }
    console.log(`Seeding ${name}...`)
    await seeder.run()
  }
}

export { SeederFactory }