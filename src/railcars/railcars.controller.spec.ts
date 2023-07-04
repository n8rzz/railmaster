import { Test, TestingModule } from '@nestjs/testing';
import { RailcarsController } from './railcars.controller';
import { RailcarsService } from './railcars.service';

describe('RailcarsController', () => {
  let controller: RailcarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RailcarsController],
      providers: [RailcarsService],
    }).compile();

    controller = module.get<RailcarsController>(RailcarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
