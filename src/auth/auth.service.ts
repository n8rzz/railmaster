import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from './unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService) {}

  public async signIn(username: string, pass: string): Promise<unknown> {
    const user = await this._userService.getUserByEmail(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
