import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.user.findUnique({ where: { name } });
  }

  async getUserData(id: number) {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        avatarPath: true,
        role: true,
      },
      where: { id },
    });
  }

  async createUser(userData: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { name: userData.name },
    });
    if (existUser)
      throw new HttpException(
        'Пользователь с таким ником уже существует',
        HttpStatus.BAD_REQUEST,
      );
    userData.password = await bcrypt.hash(userData.password, 10);
    return this.prisma.user.create({ data: userData });
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.prisma.user.update({
      where: { id },
      data: { ...userData },
    });
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
