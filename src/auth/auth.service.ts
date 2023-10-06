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
import { TokenDto } from './dto/token.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { IAuthData, ITokens, TokenPayload } from './types/auth.types';
import { IUserData } from 'src/users/types/users.types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async registration(createUserData: CreateUserDto): Promise<IAuthData> {
    const existUser = await this.usersService.findByName(createUserData.name);
    if (existUser)
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.usersService.createUser(createUserData);
    return await this.getAuthData(user.id);
  }

  async login(authData: AuthDto): Promise<IAuthData> {
    const user = await this.usersService.findByName(authData.name);
    return await this.getAuthData(user.id);
  }

  async getNewToken(refreshTokenData: TokenDto): Promise<ITokens> {
    const tokenPayload = await this.jwt.verifyAsync(refreshTokenData.token);
    if (!tokenPayload)
      throw new UnauthorizedException('Неверный refresh token');
    return await this.getTokens(tokenPayload.userId);
  }

  async validate(authData: AuthDto) {
    const existUser = await this.usersService.findByName(authData.name);
    if (existUser) {
      const validPassword = await bcrypt.compare(
        authData.password,
        existUser.password,
      );
      if (validPassword) {
        return await this.usersService.getUserData(existUser.id);
      }
    }
    throw new HttpException(
      'Неверный логин или пароль',
      HttpStatus.BAD_REQUEST,
    );
  }

  async getAuthData(userId: number): Promise<IAuthData> {
    const userData = await this.usersService.getUserData(userId);
    const tokens = await this.getTokens(userData);

    return { user: userData, ...tokens };
  }

  async getTokens(userData: IUserData) {
    const payload: TokenPayload = {
      userId: userData.id,
      name: userData.name,
      role: userData.role.name
    };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN_ACCESS'),
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN_REFRESH'),
    });

    return { accessToken, refreshToken };
  }
}
