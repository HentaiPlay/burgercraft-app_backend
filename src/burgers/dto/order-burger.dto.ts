import {
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BurgerIngredientDto } from './burger-ingredients.dto';
import { ApiProperty } from '@nestjs/swagger';

const exampleIngredients = [
  { id: 1, type: "burger_ingredient", slug: "verhnyaya_bulochka" },
  { id: 2, type: "burger_ingredient", slug: "marinovannye_ogurcy" },
  { id: 4, type: "burger_ingredient", slug: "bekon" },
  { id: 3, type: "burger_ingredient", slug: "kurinyy_bifshteks" },
  { id: 12, type: "burger_ingredient", slug: "kapustnyy_list" },
  { id: 16, type: "burger_ingredient", slug: "nizhnyaya_bulochka" }
]

export class CreateOrderBurgerDto {
  @ApiProperty({ example: exampleIngredients, description: 'Список ингредиентов' })
  @IsNotEmpty({ message: 'Обязательное поле' })
  @IsArray({ message: 'Должно быть массивом' })
  @ArrayMinSize(6, { message: 'Должно быть как минимум 6 ингредиентов' })
  @ArrayMaxSize(12, { message: 'Должно быть не более 15 ингредиентов' })
  @ValidateNested({ each: true })
  @Type(() => BurgerIngredientDto)
  ingredients: BurgerIngredientDto[];
}
