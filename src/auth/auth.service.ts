import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from './unauthorized.exception';
import { IJwtResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService, private readonly _jwtService: JwtService) {}

  public async login(username: string, pass: string): Promise<IJwtResponse> {
    const user = await this._userService.getUserByEmail(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this._jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
