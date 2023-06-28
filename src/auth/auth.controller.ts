import { Body, Controller, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { AppVersion } from '../app.constants';
import { AuthService } from './auth.service';
import { signInDto } from './auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Version(AppVersion.One)
  signIn(@Body() signInDto: signInDto) {
    return this._authService.signIn(signInDto.email, signInDto.password);
  }
}
