import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @HttpCode(200)
  @Post('refresh')
  async getNewToken(@Body() refreshToken: TokenDto) {
    return this.authService.getNewToken(refreshToken);
  }
}
