import { Controller, Get, Req, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { AppVersion } from '../app.constants';
import { RequestWithUser } from '../auth/auth.types';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../swagger/swagger.constants';
import { UserDto } from './dto/user.dto';

@ApiBearerAuth()
@ApiTags(ApiTagName.User)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Show User' })
  @ApiResponse({ status: 200, description: 'Success', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  profile(@Req() req: RequestWithUser) {
    return req.user;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.getUserById(+id);
  // }
}
