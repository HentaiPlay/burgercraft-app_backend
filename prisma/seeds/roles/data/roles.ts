import { RoleType } from "@prisma/client"

interface IRole {
  name: RoleType,
  accessList: {
    interfaces: {
      profile: boolean
      products: boolean
      burgers: boolean
      orders: boolean
      stats: boolean
    },
    functions: {
      editProfile: boolean
      removeProfiles: boolean
      getStats: boolean
      createProduct: boolean
      editProduct: boolean
      createOrder: boolean
      editOrder: boolean
    }
  }
}

const admin: IRole = {
  name: RoleType.admin,
  accessList: {
    interfaces: {
      profile: true,
      products: true,
      burgers: false,
      orders: false,
      stats: true
    },
    functions: {
      editProfile: true,
      removeProfiles: true,
      getStats: true,
      createProduct: true,
      editProduct: true,
      createOrder: false,
      editOrder: false
    }
  }
}

const crafter: IRole = {
  name: RoleType.crafter,
  accessList: {
    interfaces: {
      profile: true,
      products: true,
      burgers: true,
      orders: true,
      stats: false
    },
    functions: {
      editProfile: true,
      removeProfiles: false,
      getStats: false,
      createProduct: false,
      editProduct: false,
      createOrder: true,
      editOrder: true
    }
  }
}

export const roles = [admin, crafter]