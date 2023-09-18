import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { RefereshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() userData: AuthDto) {
    return this.authService.login(userData);
  }

  @HttpCode(200)
  @Post('refresh')
  async getNewToken(@Body() refreshToken: RefereshTokenDto) {
    return this.authService.getNewToken(refreshToken);
  }
}
