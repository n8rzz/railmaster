import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

/**
 * This strategy can be found here:
 *
 * @link https://github.com/adamjq/production-ready-serverless-nestjs/blob/78e7dacd7881ffdf47e390a0369dae45c3404db2/src/health/prismaHealthIndicator.ts
 */
@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this._prismaService.$queryRaw`SELECT 1`;

      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError('Prisma check failed', e);
    }
  }
}
