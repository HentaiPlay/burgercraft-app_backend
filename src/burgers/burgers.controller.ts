import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BurgersService } from './burgers.service';
import { CreateBurgerDto } from './dto/create-burger.dto';

@Controller('burgers')
export class BurgersController {
  constructor(private readonly burgersService: BurgersService) {}

  @Post('create')
  @HttpCode(201)
  async createBurger(@Body() burgerData: CreateBurgerDto) {
    return await this.burgersService.createBurger(burgerData);
  }

  @Delete(':id')
  async deleteBurger(@Param('id', ParseIntPipe) id: number) {
    await this.burgersService.deleteBurger(id);
  }
}
