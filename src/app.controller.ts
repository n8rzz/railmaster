import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from './swagger/swagger.constants';

@ApiTags(ApiTagName.Health)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Application Health status' })
  getHealth(): string {
    return this.appService.getHello();
  }
}
