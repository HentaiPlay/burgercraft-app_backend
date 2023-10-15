import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class UploadPhotoDto {
  @ApiProperty({ example: 'Coca Cola', description: 'Название продукта'})
  @IsNotEmpty({ message: 'Название продукта - обязательное поле' })
  @IsString({ message: 'Название продукта должно быть строкой' })
  name: string

  @ApiProperty({ example: 'drink', description: 'Тип продукта'})
  @IsNotEmpty({ message: 'Тип продукта - обязательное поле' })
  @IsString({ message: 'Тип продукта должен быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;

  @ApiProperty({ example: 'coca_cola.jpg', description: 'Название файла'})
  @IsNotEmpty({ message: 'Название файла - обязательное поле' })
  @IsString({ message: 'Название файла должно быть строкой' })
  fileName: string;
}