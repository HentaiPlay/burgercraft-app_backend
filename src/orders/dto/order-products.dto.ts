import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { OrderProductType } from 'src/products/types/products.types';

export class OrderProductDto {
  @ApiProperty({ example: 1, description: 'Идентификатор товара заказа' })
  @IsNotEmpty({ message: 'Идентификатор товара заказа - обязательное поле'})
  @IsInt({ message: 'Идентификатор товара заказа должен быть числом' })
  id: number;

  @ApiProperty({ example: 'order_product', description: 'Тип продукта (товар заказа)' })
  @IsNotEmpty({ message: 'Тип продукта - обязательное поле'})
  @IsString({ message: 'Тип продукта должен быть строкой' })
  @IsEnum(OrderProductType, { message: 'Тип продукта не соответствует товару заказа' })
  type: OrderProductType;

  @ApiProperty({ example: 'govyazhiy_bifshteks', description: 'Транскрипция от названия товара заказа' })
  @IsNotEmpty({ message: 'Транскрипция - обязательное поле'})
  @IsString({ message: 'Транскрипция должна быть строкой' })
  slug: string;
}