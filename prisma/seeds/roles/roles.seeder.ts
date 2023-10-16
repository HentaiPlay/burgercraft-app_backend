import { Seeder } from "../seeder.abstract"
import { roles } from "./data/roles";

export class RolesSeeder extends Seeder {
  
  async run () {
    await this.prisma.role.deleteMany();
  
    await this.prisma.role.createMany({
      data: roles
    })
  }
}