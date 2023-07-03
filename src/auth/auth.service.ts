import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from './unauthorized.exception';
import { IJwtAccessTokenFields, IJwtResponse } from './auth.types';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService, private readonly _jwtService: JwtService) {}

  public async login(user: User): Promise<IJwtResponse> {
    try {
      const tokenPayload = this._buildAccessTokenPayload(user);
      const access_token = await this._jwtService.signAsync(tokenPayload);

      return {
        access_token,
        permissions: [],
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async validateUser(email: string, plainTextPassword: string): Promise<User> {
    const user = await this._userService.getUserByEmail(email);

    await this._verifyPassword(plainTextPassword, user.password);

    return user;
  }

  private _buildAccessTokenPayload(user: User): IJwtAccessTokenFields {
    return {
      email: user.email,
      id: user.id,
    };
  }

  private async _verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
  }
}
