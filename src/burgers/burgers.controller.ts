import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BurgersService } from './burgers.service';
import { UpdateBurgerDto } from './dto/update-burger.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Burger } from 'src/utilities/decorators/burger';
import { CreateBurgerDto } from './dto/create-burger.dto';

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

  @ApiOperation({ summary: 'Создание бургера (при редактировании заказа с обновлением стоимости заказа)' })
  @ApiBody({ type: CreateBurgerDto })
  @Post()
  async createBurger (@Burger() burgerData: CreateBurgerDto) {
    return await this.burgersService.createBurger(burgerData)
  }

  @ApiOperation({ summary: 'Редактирование бургера (с обновлением стоимости заказа)' })
  @ApiBody({ type: UpdateBurgerDto })
  @Patch()
  async updateBurger (@Burger() burgerData: UpdateBurgerDto) {
    return await this.burgersService.updateBurger(burgerData)
  }

  @ApiOperation({ summary: 'Удаление бургера' })
  @ApiBody({ type: UpdateBurgerDto })
  @Delete()
  async deleteBurger(@Body() burgerData: UpdateBurgerDto) {
    await this.burgersService.deleteBurger(burgerData.id);
  }
}
