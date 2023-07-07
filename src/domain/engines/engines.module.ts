import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EnginesService } from './engines.service';
import { EnginesController } from './engines.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EnginesController],
  providers: [EnginesService],
})
export class EnginesModule {}
