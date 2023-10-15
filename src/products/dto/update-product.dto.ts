import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({example: 1, description: 'Идентификатор продукта' })
  @IsNotEmpty({ message: 'Идентификатор продукта - обязательное поле' })
  @IsInt({ message: 'Идентификатор продукта должен быть числом' })
  id: number;
}
