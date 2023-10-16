import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utilities/decorators/roles';
import { Role } from 'src/roles/types/roles.types';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';

@ApiTags('StatsController')
@UseGuards(JWTAuthGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: 'Получение статистики по пользователям' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getStats () {
    return await this.statsService.getAll()
  }

  @ApiOperation({ summary: 'Получение статистики по конкретному пользователю' })
  @Get(':id')
  async getStatsByCrafterId (@Param('id', ParseIntPipe) id: number ) {
    return await this.statsService.getByCrafterId(id)
  }
}
