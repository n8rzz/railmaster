import { Module } from '@nestjs/common';
import { RailcarsService } from './railcars.service';
import { RailcarsController } from './railcars.controller';

@Module({
  controllers: [RailcarsController],
  providers: [RailcarsService]
})
export class RailcarsModule {}
