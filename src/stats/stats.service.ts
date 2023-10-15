import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStatsDto } from './dto/create-stats.dto';
import { Stats } from './types/stats.types';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Stats[]> {
    const statsData = await this.prisma.stats.findMany({
      select: {
        id: true,
        summ: true,
        amountOrders: true,
        crafterId: true,
      },
      orderBy: {
        updatedAt: 'asc'
      }
    })
    const stats: Stats[] = []
    for (const item of statsData) {
      const crafter = await this.prisma.user.findFirst({
        where: { id: item.crafterId },
        select: { name: true }
      })
      stats.push({
        crafterName: crafter.name,
        ...item
      })
    }
    return stats
  }

  // Если данных по статистике нет, создаем запись
  async createStats (statsData: CreateStatsDto): Promise<void> {
    await this.prisma.stats.create({
      data: {
        amountOrders: 1,
        summ: statsData.summ,
        crafterId: statsData.crafterId
      }
    })
  }

  async updateStats (statsData: CreateStatsDto): Promise<void> {
    // Получение записи статистики
    const existStats = await this.prisma.stats.findUnique({
      where: { crafterId: statsData.crafterId }
    })

    // Если нету записи создаем новую
    if (!existStats) {
      await this.createStats(statsData)
      return
    }
    
    // Обновление статистики
    const newSumm = existStats.summ + statsData.summ
    const data = {
      amountOrders: ++existStats.amountOrders,
      summ: newSumm
    }
    await this.prisma.stats.update({
      where: { crafterId: statsData.crafterId },
      data: data
    })
  }
}
