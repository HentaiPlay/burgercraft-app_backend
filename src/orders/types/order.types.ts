import { StatusType } from "@prisma/client";
import { Burger } from "src/burgers/types/burgers.types";
import { OrderProduct } from "src/products/types/products.types";

export interface Order {
  id: number,
  price: number,
  code: string,
  status: StatusType
  isSaled: boolean,
  burgers: Array<Burger>,
  products: Array<OrderProduct>
}

export interface OrderListElement {
  id: number,
  code: string,
  status: StatusType,
  updatedAt: Date
}