import { RoleType } from "@prisma/client"
import { IUserData } from "src/users/types/users.types"

export type TokenPayload = {
  userId: number,
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