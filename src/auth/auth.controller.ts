import { Body, Controller, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { AppVersion } from '../app.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Version(AppVersion.One)
  login(@Body() signInDto: LoginDto) {
    return this._authService.login(signInDto.email, signInDto.password);
  }
}
