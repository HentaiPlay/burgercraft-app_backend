import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { BurgerIngredientType } from 'src/products/types/products.types';

export class BurgerIngredientDto {
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsInt({ message: 'Должно быть числом' })
  id: number;

  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(BurgerIngredientType, { message: 'Тип не соответствует ингредиенту' })
  type: BurgerIngredientType;

  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  slug: string;
}