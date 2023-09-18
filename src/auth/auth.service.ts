import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefereshTokenDto } from './dto/refresh-token.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async registration(createUserData: CreateUserDto) {
    const existUser = await this.usersService.findByName(createUserData.name);
    if (existUser)
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.usersService.createUser(createUserData);
    return await this.getAuthData(user.id);
  }

  async login(authData: AuthDto) {
    const valid = await this.validate(authData);
    if (valid) {
      const user = await this.usersService.findByName(authData.name);
      return await this.getAuthData(user.id);
    } else {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getNewToken(refreshTokenData: RefereshTokenDto) {
    const tokenPayload = await this.jwt.verifyAsync(refreshTokenData.token);
    if (!tokenPayload)
      throw new UnauthorizedException('Неверный refresh token');
    return await this.getAuthData(tokenPayload.userId);
  }

  async validate(authData: AuthDto) {
    const existUser = await this.usersService.findByName(authData.name);
    if (!existUser) return null;
    const validPassword = await bcrypt.compare(
      authData.password,
      existUser.password,
    );
    return validPassword
      ? await this.usersService.getUserData(existUser.id)
      : null;
  }

  async getAuthData(userId: number) {
    const userData = await this.usersService.getUserData(userId);
    const tokens = await this.getTokens(userId);

    return { user: userData, ...tokens };
  }

  async getTokens(userId: number) {
    const data = { userId: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN_ACCESS'),
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN_REFRESH'),
    });

    return { accessToken, refreshToken };
  }
}
