import { IRoleData } from "src/roles/types/roles.types"

export interface IUserData {
  id: number
  name: string,
  avatar: string,
  role: IRoleData
}