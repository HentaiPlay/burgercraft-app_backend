import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utilities/decorators/roles';
import { Role } from 'src/roles/types/roles.types';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';

@ApiTags('StatsController')
@Roles(Role.ADMIN)
@UseGuards(JWTAuthGuard, RolesGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: 'Получение статистики по пользователям' })
  @Get()
  async getStats () {
    return await this.statsService.getAll()
  }
}
