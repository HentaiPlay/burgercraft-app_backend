import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateBurgerDto } from './create-burger.dto';

export class UpdateBurgerDto extends PartialType(CreateBurgerDto) {
  @ApiProperty({ example: 1, description: 'Идентификатор бургера' })
  @IsNotEmpty({ message: 'Идентификатор бургера - обязательное поле' })
  @IsInt({ message: 'Идентификатор бургера должен быть числом' })
  id: number;
}