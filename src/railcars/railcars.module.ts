import { Module } from '@nestjs/common';
import { RailcarsService } from './railcars.service';
import { RailcarsController } from './railcars.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RailcarsController],
  providers: [RailcarsService],
})
export class RailcarsModule {}
