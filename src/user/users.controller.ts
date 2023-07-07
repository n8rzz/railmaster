import { Controller, Get, Req, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { AppVersion } from '../app.constants';
import { RequestWithUser } from '../auth/auth.types';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../swagger/swagger.constants';
import { UserDto } from './dto/user.dto';

@ApiBearerAuth()
@ApiTags(ApiTagName.Users)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
