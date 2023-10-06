import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthData, ITokens } from './types/auth.types';
import { AuthDto } from './dto/auth.dto';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: Promise<IAuthData> })
  @HttpCode(200)
  @Post('register')
  async register(@Body() userData: CreateUserDto): Promise<IAuthData> {
    return this.authService.registration(userData);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: Promise<IAuthData> })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() authData: AuthDto): Promise<IAuthData> {
    return this.authService.login(authData);
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @ApiResponse({ status: 200, type: Promise<ITokens> })
  @HttpCode(200)
  @Post('refresh')
  async getNewToken(@Body() refreshToken: TokenDto): Promise<ITokens> {
    return this.authService.getNewToken(refreshToken);
  }
}
