import { Test, TestingModule } from '@nestjs/testing';
import { createEngineMock, engineMock } from './__mocks__/engine.mocks';
import { EnginesController } from './engines.controller';
import { EnginesService } from './engines.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('EnginesController', () => {
  const engineIdMock = '1';
  let controller: EnginesController;
  let service: EnginesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [EnginesController],
      providers: [EnginesService],
    }).compile();

    controller = module.get<EnginesController>(EnginesController);
    service = module.get<EnginesService>(EnginesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a Railcar', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(engineMock);

      const result = await controller.create(createEngineMock);

      expect(result).toEqual(engineMock);
      expect(service.create).toHaveBeenCalledWith(createEngineMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of Railcars', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([engineMock]);

      const result = await controller.findAll();

      expect(result).toEqual([engineMock]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a Railcar by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(engineMock);

      const result = await controller.findOne(engineIdMock);

      expect(result).toEqual(engineMock);
      expect(service.findOne).toHaveBeenCalledWith(+engineIdMock);
    });
  });

  describe('update', () => {
    it('should update a Railcar by id', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(engineMock);

      const result = await controller.update(engineIdMock, engineMock);

      expect(result).toEqual(engineMock);
      expect(service.update).toHaveBeenCalledWith(+engineIdMock, engineMock);
    });
  });

  describe('remove', () => {
    it('should delete a Railcar by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined as never);

      const result = await controller.remove(engineIdMock);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(+engineIdMock);
    });
  });
});
