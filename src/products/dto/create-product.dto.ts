import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class CreateProductDto {
  @ApiProperty({ example: 'Coca Cola', description: 'Название продукта'})
  @IsNotEmpty({ message: 'Название продукта - обязательное поле' })
  @IsString({ message: 'Название продукта должно быть строкой' })
  name: string

  @ApiProperty({ example: 'drink', description: 'Тип продукта'})
  @IsNotEmpty({ message: 'Тип продукта - обязательное поле' })
  @IsString({ message: 'Тип продукта должен быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;

  @ApiProperty({ example: 'coca_cola', description: 'Транскрипция от названия продукта'})
  @IsOptional()
  @IsString({ message: 'Транскрипция должна быть строкой' })
  slug: string;

  @ApiProperty({ example: 50, description: 'Цена продукта'})
  @IsNotEmpty({ message: 'Цена продукта - обязательное поле' })
  @IsInt({ message: 'Цена продукта должна быть числом' })
  price: number;

  @ApiProperty({ example: 'product/drinks/coca_cola.jpg', description: 'Название файла'})
  @IsOptional()
  @IsString({ message: 'Название файла должно быть строкой' })
  photoPath: string;
}