import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class ProductParamDto {
  @ApiProperty({ example: 'drink', description: 'Тип продукта'})
  @IsString({ message: 'Тип продукта должен быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;
}
