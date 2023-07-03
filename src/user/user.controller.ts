import { Controller, Get, Req, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { AppVersion } from '../app.constants';
import { RequestWithUser } from '../auth/auth.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
