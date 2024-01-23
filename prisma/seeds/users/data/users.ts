import * as bcrypt from 'bcryptjs';

interface IUser {
  name: string
  password: string
  roleId: number
  avatar?: string
}

const users: IUser[] = [
  {
    name: 'admin',
    password: 'password',
    roleId: 1
  },
  {
    name: 'crafter98',
    password: 'password',
    roleId: 2,
    avatar: '1697418583275_108497334.jpg'
  },
  {
    name: 'aboba@minecraft',
    password: 'password',
    roleId: 2
  }
]

export const getUsers = async (): Promise<IUser[]> => {
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return users
}