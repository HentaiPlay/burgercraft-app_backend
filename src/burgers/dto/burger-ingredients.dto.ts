import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { BurgerIngredientType } from 'src/products/types/products.types';

export class BurgerIngredientDto {
  @ApiProperty({ example: 1, description: 'Идентификатор ингредиента' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsInt({ message: 'Должно быть числом' })
  id: number;

  @ApiProperty({ example: 'burger_ingredient', description: 'ингредиент' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(BurgerIngredientType, { message: 'Тип не соответствует ингредиенту' })
  type: BurgerIngredientType;

  @ApiProperty({ example: 'govyazhiy_bifshteks', description: 'Транскрипция от названия ингредиента' })
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  slug: string;
}