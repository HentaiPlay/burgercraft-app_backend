import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class ProductParamDto {
  @ApiProperty({ example: 'drink', description: 'Параметр для типа продукта'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;
}
