import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards, Version } from '@nestjs/common';
import { AppVersion } from '../app.constants';
import { AuthService } from './auth.service';
import { RequestWithUser } from './auth.types';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Version(AppVersion.One)
  login(@Req() req: RequestWithUser) {
    return this._authService.login(req.user);
  }
}
