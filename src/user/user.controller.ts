import { Controller, Get, Request, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { AppVersion } from '../app.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @Version(AppVersion.One)
  getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.getUserById(+id);
  // }
}
