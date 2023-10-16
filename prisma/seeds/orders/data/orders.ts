import { StatusType } from "@prisma/client"

interface IOrder {
  id: number
  code: string
  status: StatusType
  price: number
  crafterId: number
}

export const orders: IOrder[] = [
  {
    id: 1,
    code: 'A-08',
    status: StatusType.cooking,
    price: 578,
    crafterId: 2
  },
  {
    id: 2,
    code: 'X-24',
    status: StatusType.cooking,
    price: 495,
    crafterId: 2
  },
  {
    id: 3,
    code: 'O-15',
    status: StatusType.accepted,
    price: 238,
    crafterId: 2
  },
  {
    id: 4,
    code: 'B-67',
    status: StatusType.ready,
    price: 367,
    crafterId: 2
  },
  {
    id: 5,
    code: 'M-32',
    status: StatusType.ready,
    price: 276,
    crafterId: 3
  },
  {
    id: 6,
    code: 'V-02',
    status: StatusType.ready,
    price: 288,
    crafterId: 3
  }
]