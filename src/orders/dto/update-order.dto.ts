import { IsNotEmpty, IsInt, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderProductDto } from './order-products.dto';
import { Type } from 'class-transformer';

const exampleOrderProducts = [
  { id: 14, type: "drink", slug: "coca_cola" },
  { id: 13, type: "snack", slug: "kartoshka_fri" },
]

export class UpdateOrderDto {
  @ApiProperty({example: 1, description: 'Идентификатор заказа' })
  @IsNotEmpty({ message: 'Идентификатор заказа - обязательное поле' })
  @IsInt({ message: 'Идентификатор заказа должен быть числом' })
  id: number;

  @ApiProperty({example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Идентификатор пользователя - обязательное поле' })
  @IsInt({ message: 'Идентификатор пользователя должен быть числом' })
  crafterId: number;

  @ApiProperty({ example: exampleOrderProducts, description: 'Список товаров заказа' })
  @IsArray({ message: 'Список товаров заказа должен быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  ordersProducts: OrderProductDto[];
}
