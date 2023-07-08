import { Module } from '@nestjs/common';
import { PrismaModule } from './domain/prisma/prisma.module';
import { UsersModule } from './domain/user/users.module';
import { GamesModule } from './domain/game/games.module';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './domain/auth/jwt-auth.guard';
import { HealthModule } from './domain/health/health.module';
import { RailcarsModule } from './domain/railcars/railcars.module';
import { EnginesModule } from './domain/engines/engines.module';
import { TrainsModule } from './domain/trains/trains.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        DB_PORT: Joi.number(),
        DB_HOST: Joi.string(),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
    HealthModule,
    GamesModule,
    UsersModule,
    RailcarsModule,
    EnginesModule,
    TrainsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
  ],
})
export class AppModule {}
