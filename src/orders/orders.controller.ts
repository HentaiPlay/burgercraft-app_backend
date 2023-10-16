import { Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/utilities/decorators/order';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SwitchStatusOrderDto } from './dto/switch-status-order.dto';

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
  @ApiBody({ type: CreateOrderDto })
  @Post()
  @HttpCode(201)
  async createOrder (@Order() order: CreateOrderDto) {
    return await this.ordersService.createOrder(order);
  }

  @ApiOperation({ summary: 'Редактирование заказа' })
  @ApiBody({ type: UpdateOrderDto })
  @Patch()
  async updateOrder (@Order() order: UpdateOrderDto) {
    return await this.ordersService.updateOrder(order);
  }

  @ApiOperation({ summary: 'Смена статуса заказа' })
  @ApiBody({ type: SwitchStatusOrderDto })
  @Put('status')
  async updateOrderStatus (@Order() order: SwitchStatusOrderDto) {
    await this.ordersService.updateStatus(order);
  }
}
