import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { OrderProductType } from 'src/products/types/products.types';

export class OrderProductDto {
  @ApiProperty({ example: 1, description: 'Идентификатор товара заказа' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsInt({ message: 'Должно быть числом' })
  id: number;

  @ApiProperty({ example: 'order_product', description: 'товар заказа' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(OrderProductType, { message: 'Тип не соответствует товару заказа' })
  type: OrderProductType;

  @ApiProperty({ example: 'govyazhiy_bifshteks', description: 'Транскрипция от названия товара заказа' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  slug: string;
}