import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ProductType, ProductTypes } from '../types/products.types';

export class UploadPhotoDto {
  @ApiProperty({ example: 'Coca Cola', description: 'Название продукта'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  name: string

  @ApiProperty({ example: 'drink', description: 'Параметр для типа продукта'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(ProductTypes, { message: 'Тип продукта не существует' })
  type: ProductType;

  @ApiProperty({ example: 'coca_cola.jpg', description: 'Название сохраненного файла'})
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsString({ message: 'Должно быть строкой' })
  fileName: string;
}