import {
  Controller,
  Get,
  Put,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Header,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AvatarFileInterceptorOptions } from 'src/utilities/interceptors/images.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utilities/decorators/user';

@ApiTags('UserController')
@Controller('users')
@UseGuards(JWTAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiOperation({ summary: 'Получение данных пользователя' })
  @Get('info')
  async getUserInfo (@Request() req) {
    const id = req.user.id
    return await this.usersService.getUserData(id);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  update(@User() user: UpdateUserDto): Promise<void> {
    return this.usersService.updateUser(user);
  }

  @ApiOperation({ summary: 'Получение аватарки пользователя (бинарный файл)' })
  @Get('avatar')
  @Header('Content-Type', 'image/png')
  async getUserAvatar(
    @Request() req
  ): Promise<StreamableFile> {
    const id: number = req.user.id;
    const user = await this.usersService.findById(id);
    const file = createReadStream(
      join(process.cwd(), `files/images/avatars/${user.avatar}`),
    );
    return new StreamableFile(file);
  }

  @ApiOperation({ summary: 'Изменение аватарки пользователя' })
  @Put('avatar')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', AvatarFileInterceptorOptions))
  uploadAvatar(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const id = req.user.id
    return this.usersService.uploadAvatar(id, file);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @Delete()
  remove(@Request() req): Promise<void> {
    return this.usersService.deleteUser({ id: Number(req.user.id) });
  }
}
