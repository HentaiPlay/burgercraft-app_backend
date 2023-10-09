import {
  Controller,
  Get,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Header,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/utilities/decorators/roles';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Role } from 'src/roles/types/roles.types'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarFileInterceptorOptions } from 'src/utilities/interceptors/images.interceptor';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UserController')
@Controller('users')
@UseGuards(JWTAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Обновление пользователя' })
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto): Promise<void> {
    return this.usersService.updateUser(updateUserDto);
  }

  @ApiOperation({ summary: 'Получение аватарки пользователя (бинарный файл)' })
  @Get('avatar/:id')
  @Header('Content-Type', 'image/png')
  async getUserAvatar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StreamableFile> {
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete()
  remove(@Body() updateUserDto: UpdateUserDto): Promise<void> {
    return this.usersService.deleteUser(updateUserDto);
  }
}
