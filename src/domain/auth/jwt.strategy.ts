import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtAccessTokenFields } from './auth.types';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtAccessTokenFields): Promise<Partial<UserDto>> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
