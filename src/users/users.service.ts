import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.user.findFirst({ where: { name } });
  }

  async getUserData(id: number) {
    return await this.prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        avatar: true,
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

  async updateUser(userData: UpdateUserDto) {
    const existUser = await this.findById(userData.id);
    if (!existUser) {
      throw new HttpException(
        'Такого пользователя несуществует',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.prisma.user.update({
      where: { name: existUser.name },
      data: { ...userData },
    });
  }

  async removeAvatar(id: number) {
    const user = await this.findById(id);
    const defaultAvatar = 'default.png';
    if (user.avatar !== defaultAvatar) {
      const path = `files/images/avatars/${user.avatar}`
      if (fs.existsSync(path)) {
        console.log('такой файл есть')
        fs.unlinkSync(path)
      }
    }
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    await this.removeAvatar(id);
    await this.updateUser({ id: id, avatar: file.filename });
  }

  async deleteUser(userData: UpdateUserDto) {
    await this.removeAvatar(userData.id);
    await this.prisma.user.delete({ where: { id: userData.id } });
  }
}
