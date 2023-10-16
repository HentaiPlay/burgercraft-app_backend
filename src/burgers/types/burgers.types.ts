import { BurgerIngredientOptions } from "src/products/types/products.types"

export type Burger = {
  price: number,
  ingredients: Array<BurgerIngredientOptions>
  orderId: number
}

export type BurgerIngredient = {
  id: number,
  burgerId: number,
  ingredientId: number
}