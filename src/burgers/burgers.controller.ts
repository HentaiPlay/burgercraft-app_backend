import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { BurgersService } from './burgers.service';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { UpdateBurgerDto } from './dto/update-burger.dto';

@Controller('burgers')
export class BurgersController {
  constructor(private readonly burgersService: BurgersService) {}

  @Get(':id')
  async getBurger (@Param('id', ParseIntPipe) id: number) {
    return await this.burgersService.findById(id)
  }

  @Post('create')
  @HttpCode(201)
  async createBurger(@Body() burgerData: CreateBurgerDto) {
    return await this.burgersService.createBurger(burgerData);
  }

  @Patch()
  async updateBurger (@Body() burgerData: UpdateBurgerDto) {
    return await this.burgersService.updateBurger(burgerData)
  }

  @Delete()
  async deleteBurger(@Body() burgerData: UpdateBurgerDto) {
    await this.burgersService.deleteBurger(burgerData.id);
  }
}
