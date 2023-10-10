import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class CreateProductDto {
  @ApiProperty({ example: 'Coca Cola', description: 'Название продукта'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  name: string

  @ApiProperty({ example: 'drink', description: 'Параметр для типа продукта'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;

  @ApiProperty({ example: 'coca_cola', description: 'Транскрипция от названия продукта, генерируется при создании'})
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  slug: string;

  @ApiProperty({ example: 50, description: 'Цена продукта'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  price: number;

  @ApiProperty({ example: 'product/drinks/coca_cola.jpg', description: 'Название файла'})
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  photoPath: string;
}