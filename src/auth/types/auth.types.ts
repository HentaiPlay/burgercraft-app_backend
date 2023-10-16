import { RoleType } from "@prisma/client"
import { IUserData } from "src/users/types/users.types"

export type TokenPayload = {
  id: number,
  name: string
  role: RoleType,
}

export interface ITokens {
  accessToken: string,
  refreshToken: string
}

export interface IAuthData extends ITokens{
  user: IUserData,
}