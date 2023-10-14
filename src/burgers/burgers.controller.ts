import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BurgersService } from './burgers.service';
import { UpdateBurgerDto } from './dto/update-burger.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Burger } from 'src/utilities/decorators/burger';

@ApiTags('BurgerController')
@Controller('burgers')
@UseGuards(JWTAuthGuard)
export class BurgersController {
  constructor(private readonly burgersService: BurgersService) {}

  @ApiOperation({ summary: 'Получение бургера по id' })
  @Get(':id')
  async getBurger (@Param('id', ParseIntPipe) id: number) {
    return await this.burgersService.findById(id)
  }

  @ApiOperation({ summary: 'Редактирование бургера (с обновлением стоимости заказа)' })
  @Patch()
  async updateBurger (@Burger() burgerData: UpdateBurgerDto) {
    return await this.burgersService.updateBurger(burgerData)
  }

  @ApiOperation({ summary: 'Удаление бургера' })
  @Delete()
  async deleteBurger(@Body() burgerData: UpdateBurgerDto) {
    await this.burgersService.deleteBurger(burgerData.id);
  }
}
