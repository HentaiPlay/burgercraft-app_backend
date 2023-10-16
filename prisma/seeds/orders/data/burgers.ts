interface IBurger {
  id: number
  price: number
  orderId: number
}

export const burgers: IBurger[] = [
  {
    id: 1,
    price: 263,
    orderId: 1
  },
  {
    id: 2,
    price: 205,
    orderId: 1
  },
  {
    id: 3,
    price: 128,
    orderId: 2
  },
  {
    id: 4,
    price: 242,
    orderId: 2
  },
  {
    id: 5,
    price: 203,
    orderId: 3
  },
  {
    id: 6,
    price: 257,
    orderId: 4
  },
  {
    id: 7,
    price: 156,
    orderId: 5
  },
  {
    id: 8,
    price: 178,
    orderId: 6
  }
]