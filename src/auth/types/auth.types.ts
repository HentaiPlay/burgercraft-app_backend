import { IUserData } from "src/users/types/users.types"

export interface ITokens {
  accessToken: string,
  refreshToken: string
}

export interface IAuthData extends ITokens{
  user: IUserData,
}