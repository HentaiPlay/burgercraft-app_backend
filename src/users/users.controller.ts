import {
  Controller,
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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Req,
  HttpException,
  HttpStatus,
  BadRequestException,
  // BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/utilities/decorators/roles';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Role } from 'src/utilities/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AvatarFileInterceptorOptions } from 'src/pipes/validation.files';
import { UnsupportedMediaTypeException } from '@nestjs/common';

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

  @Put('avatar/:id')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', AvatarFileInterceptorOptions))
  uploadAvatar(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.usersService.uploadAvatar(id, file);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
