import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from './unauthorized.exception';
import { IJwtResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService, private readonly _jwtService: JwtService) {}

  public async login(username: string, plainTextPassword: string): Promise<IJwtResponse> {
    try {
      const user = await this._userService.getUserByEmail(username);

      await this._verifyPassword(plainTextPassword, user.password);

      const payload = { id: user.id, username: user.email };
      const access_token = await this._jwtService.signAsync(payload);

      return {
        access_token,
        permissions: [],
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async _verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
  }
}
