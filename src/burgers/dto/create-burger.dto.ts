import {
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BurgerIngredientDto } from './burger-ingredients.dto';

export class CreateBurgerDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsArray({ message: 'Должно быть массивом' })
  @ArrayMinSize(6, { message: 'Должно быть как минимум 6 ингредиентов' })
  @ArrayMaxSize(12, { message: 'Должно быть не более 15 ингредиентов' })
  @ValidateNested({ each: true })
  @Type(() => BurgerIngredientDto)
  ingredients: BurgerIngredientDto[];

  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  createdAt: Date;
}
