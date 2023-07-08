import { Test, TestingModule } from '@nestjs/testing';
import { EnginesService } from './engines.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('EnginesService', () => {
  let service: EnginesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [EnginesService],
    }).compile();

    service = module.get<EnginesService>(EnginesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
