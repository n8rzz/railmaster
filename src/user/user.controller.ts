import { Controller, Get, Req, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { AppVersion } from '../app.constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Version(AppVersion.One)
  profile(@Req() req: RequestWithUser) {
    return req.user;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.getUserById(+id);
  // }
}
