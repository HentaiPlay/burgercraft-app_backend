import {
  Controller,
  Get,
  Post,
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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/utilities/decorators/roles';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Role } from 'src/utilities/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarFileInterceptorOptions } from 'src/pipes/validation.files';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
@UseGuards(JWTAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

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

  @Put('avatar/:id')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', AvatarFileInterceptorOptions))
  uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.uploadAvatar(id, file);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
