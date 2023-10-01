export type ProductType = 'burger_ingredient' | 'snack' | 'sauce' | 'drink';

export enum ProductTypes {
  burgerIngredient = 'burger_ingredient',
  snaks = 'snaks',
  sauces = 'sauces',
  drinks = 'drinks'
}

export enum BurgerIngredientType {
  'burger_ingredient'
}

export type BurgerIngredientOptions = {
  id: number,
  name: string
  type: ProductType
  slug: string
  photoPath: string,
  price: number
}

export enum Brioche {
  up = 'verhnyaya_bulochka',
  down = 'nizhnyaya_bulochka',
}