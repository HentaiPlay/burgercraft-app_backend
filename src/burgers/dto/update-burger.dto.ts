import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateBurgerDto } from './create-burger.dto';

export class UpdateBurgerDto extends PartialType(CreateBurgerDto) {
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsInt({ message: 'Должно быть числом' })
  id: number;
}