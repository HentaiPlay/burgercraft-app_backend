interface IOrderProduct {
  orderId: number
  productId: number
}

export const ordersProducts: IOrderProduct[] = [
  // Order ID 1
  { orderId: 1, productId: 17 },
  { orderId: 1, productId: 20 },
  { orderId: 1, productId: 23 },
  // Order ID 2
  { orderId: 2, productId: 18 },
  { orderId: 2, productId: 20 },
  { orderId: 2, productId: 26 },
  // Order ID 3
  { orderId: 3, productId: 25 },
  // Order ID 4
  { orderId: 4, productId: 17 },
  { orderId: 4, productId: 19 },
  { orderId: 4, productId: 24 },
  // Order ID 5
  { orderId: 5, productId: 18 },
  { orderId: 5, productId: 21 },
  { orderId: 5, productId: 24 },
  // Order ID 6
  { orderId: 6, productId: 17 },
  { orderId: 6, productId: 19 },
  { orderId: 6, productId: 23 }
]