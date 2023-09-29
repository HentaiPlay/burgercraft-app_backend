import { Seeder } from "../seeder.abstract"

class RolesSeeder extends Seeder {
  
  async run () {
    await this.prisma.role.deleteMany();

    await this.prisma.role.create({
      data: {
        name: 'admin',
        accessList: {
          pages: {
            workplace: true,
            statistics: true
          },
          functions: {
            sendStatistics: true,
            changePrices: true
          }
        }
      }
    })
  
    await this.prisma.role.create({
      data: {
        name: 'crafter',
        accessList: {
          pages: {
            workplace: true,
            statistics: false
          },
          functions: {
            sendStatistics: false,
            changePrices: false
          }
        }
      }
    })
  }
}

export { RolesSeeder }