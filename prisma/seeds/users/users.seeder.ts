import { Seeder } from "../seeder.abstract"
import { getUsers } from "./data/users";

export class UsersSeeder extends Seeder {
  
  async run () {
    await this.prisma.user.deleteMany();
  
    const data = await getUsers()
    await this.prisma.user.createMany({
      data: data
    })
  }
}