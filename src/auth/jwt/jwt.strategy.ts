import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExperation: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(authData: AuthDto): Promise<any> {
    const user = await this.authService.validate(authData);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
