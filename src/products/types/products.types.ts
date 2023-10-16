export type ProductType = 'burger_ingredient' | 'snack' | 'sauce' | 'drink';

export enum ProductTypes {
  burgerIngredient = 'burger_ingredient',
  snack = 'snack',
  sauce = 'sauce',
  drink = 'drink'
}

export enum BurgerIngredientType {
  'burger_ingredient'
}

export enum OrderProductType {
  'snack',
  'sauce',
  'drink'
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

export type OrderProduct = {
  id: number,
  type: ProductType,
  slug: string,
  photoPath: string,
  price: number
}