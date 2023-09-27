import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({ usernameField: 'name' });
  }

  async validate(name: string, password: string): Promise<any> {
    const authData: AuthDto = { name, password };
    return await this.authService.validate(authData);
  }
}
