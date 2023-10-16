import { RoleType } from "@prisma/client"

export enum Role {
  ADMIN = 'admin',
  CRAFTER = 'crafter',
}

export interface IRoleData {
  id: number,
  name: RoleType,
  accessList: Object
}