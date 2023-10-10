import { BurgerIngredientOptions } from "src/products/types/products.types"

export type Burger = {
  price: number,
  isSaled: boolean,
  ingredients: Array<BurgerIngredientOptions>
}