import { RoleType } from "@prisma/client"

interface IRole {
  name: RoleType,
  accessList: {
    pages: Record<string, boolean>,
    interfaces: Record<string, Record<string, boolean>>
  }
}

const admin: IRole = {
  name: RoleType.admin,
  accessList: {
    pages: {
      home: true,
      products: true,
      orders: false,
      stats: true
    },
    interfaces: {
      profile: {
        create: true,
        edit: true,
        remove: true
      },
      products: {
        create: true,
        edit: true,
      },
      orders: {
        create: false,
        edit: false
      }
    }
  }
}

const crafter: IRole = {
  name: RoleType.crafter,
  accessList: {
    pages: {
      home: true,
      products: true,
      orders: true,
      stats: false
    },
    interfaces: {
      profile: {
        create: false,
        edit: true,
        remove: false
      },
      products: {
        create: false,
        edit: false,
      },
      orders: {
        create: true,
        edit: true
      }
    }
  }
}

export const roles = [admin, crafter]