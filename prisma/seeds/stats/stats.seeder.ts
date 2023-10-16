import { Seeder } from "../seeder.abstract"
import { stats } from "./data/stats";

export class StatsSeeder extends Seeder {
  
  async run () {
    await this.prisma.stats.deleteMany();
  
    await this.prisma.stats.createMany({
      data: stats
    })
  }
}