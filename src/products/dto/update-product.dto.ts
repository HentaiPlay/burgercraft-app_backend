// import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  id: number;
}
