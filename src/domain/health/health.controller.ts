import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Public } from '../../decorators/public.decorator';
import { PrismaHealthIndicator } from './prisma-health-indicator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../../swagger/swagger.constants';

@ApiTags(ApiTagName.Health)
@Controller('health')
export class HealthController {
  constructor(
    private readonly _health: HealthCheckService,
    private readonly _http: HttpHealthIndicator,
    private readonly _prismaHealthIndicator: PrismaHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({ status: 200, description: 'Current status of app systems and health' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  check() {
    return this._health.check([
      () => this._http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this._prismaHealthIndicator.isHealthy('db'),
    ]);
  }
}
