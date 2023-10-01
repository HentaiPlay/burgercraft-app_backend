import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';

export enum TypeIngredient {
  burgerIngredient = 'burger_ingredient'
}

export class BurgerIngredientDto  {
  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsInt({ message: 'Должно быть числом' })
  id: number;

  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  @IsEnum(TypeIngredient, { message: 'Тип не соответствует ингредиенту' })
  type: TypeIngredient;

  @IsNotEmpty({ message: 'Обязательное поле'})
  @IsString({ message: 'Должно быть строкой' })
  slug: string;
}