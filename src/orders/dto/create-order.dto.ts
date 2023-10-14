import {
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-products.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderBurgerDto } from 'src/burgers/dto/order-burger.dto';

const exampleBurgers = [
  { id: 1,  }
]

const exampleOrderProducts = [
  { id: 14, type: "drink", slug: "coca_cola" },
  { id: 13, type: "snack", slug: "kartoshka_fri" },
]

export class CreateOrderDto {
  @ApiProperty({ example: exampleBurgers, description: 'Список товаров заказа' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsArray({ message: 'Должно быть массивом' })
  @ArrayMinSize(1, { message: 'Должнен быть как минимум один бургер' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderBurgerDto)
  burgers: CreateOrderBurgerDto[];

  @ApiProperty({ example: exampleOrderProducts, description: 'Список товаров заказа' })
  @IsOptional()
  @IsArray({ message: 'Должно быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  ordersProducts: OrderProductDto[];

  @ApiProperty({ example: false, description: 'Статус заказа (продан или нет)' })
  @IsOptional()
  @IsBoolean({ message: 'Должно быть логическим значением' })
  isSaled: boolean

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  crafterId: number;

  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  createdAt: Date;
}
