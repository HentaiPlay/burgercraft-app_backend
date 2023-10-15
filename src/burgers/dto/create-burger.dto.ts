import {
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  ArrayMaxSize,
  IsInt,
  IsOptional,
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

export class CreateBurgerDto {
  @ApiProperty({ example: exampleIngredients, description: 'Список ингредиентов' })
  @IsNotEmpty({ message: 'Список ингредиентов - обязательный параметр' })
  @IsArray({ message: 'Список ингредиентов - должен быть массивом' })
  @ArrayMinSize(6, { message: 'В списке ингредиентов должно быть как минимум 6 ингредиентов' })
  @ArrayMaxSize(12, { message: 'В списке ингредиентов должно быть не более 15 ингредиентов' })
  @ValidateNested({ each: true })
  @Type(() => BurgerIngredientDto)
  ingredients: BurgerIngredientDto[];

  @ApiProperty({ example: false, description: 'Статус бургера (продан или нет)' })
  @IsOptional()
  @IsInt({ message: 'Статус бургера должен быть числом' })
  price: number

  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @IsNotEmpty({ message: 'Идентификатор заказа - обязательное поле' })
  @IsInt({ message: 'Идентификатор заказа должен быть числом' })
  orderId: number;
}
