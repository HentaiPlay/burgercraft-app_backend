import { Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/utilities/decorators/order';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('OrderController')
@Controller('orders')
@UseGuards(JWTAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Получение списка заказов (проданных или еще нет)' })
  @Get('list')
  async getOrderList(@Order() order) {
    return await this.ordersService.getOrderList(order.crafterId, order.isSaled)
  }

  @ApiOperation({ summary: 'Получение всего заказа' })
  @Get(':id')
  async getOrder(
    @Param('id', ParseIntPipe) id: number,
    @Order() order
  ) {
    return await this.ordersService.getOrderById(id, order.crafterId)
  }

  @ApiOperation({ summary: 'Создание заказа' })
  @Post()
  async createOrder (@Order() order: CreateOrderDto) {
    return await this.ordersService.createOrder(order);
  }

  @ApiOperation({ summary: 'Редактирование заказа' })
  @Patch()
  async updateOrder (@Order() order: UpdateOrderDto) {
    return await this.ordersService.updateOrder(order);
  }
}
