import { Test, TestingModule } from '@nestjs/testing';
import { RailcarsService } from './railcars.service';

describe('RailcarsService', () => {
  let service: RailcarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RailcarsService],
    }).compile();

    service = module.get<RailcarsService>(RailcarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
