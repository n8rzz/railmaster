import { Body, Controller, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { AppVersion } from '../app.constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IJwtResponse } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  @Version(AppVersion.One)
  login(@Body() signInDto: LoginDto): Promise<IJwtResponse> {
    return this._authService.login(signInDto.email, signInDto.password);
  }
}
