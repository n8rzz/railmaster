import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.service';
import { createTrainDtoMock, trainDtoMock } from './__mocks__/trains.mocks';

describe('TrainsController', () => {
  const trainIdMock = '1';
  let controller: TrainsController;
  let service: TrainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TrainsController],
      providers: [TrainsService],
    }).compile();

    controller = module.get<TrainsController>(TrainsController);
    service = module.get<TrainsService>(TrainsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a Train', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(trainDtoMock as never);

      const result = await controller.create(createTrainDtoMock);

      expect(result).toEqual(trainDtoMock);
      expect(service.create).toHaveBeenCalledWith(createTrainDtoMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of Trains', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([trainDtoMock] as never);

      const result = await controller.findAll();

      expect(result).toEqual([trainDtoMock]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a Train by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(trainDtoMock as never);

      const result = await controller.findOne(trainIdMock);

      expect(result).toEqual(trainDtoMock);
      expect(service.findOne).toHaveBeenCalledWith(+trainIdMock);
    });
  });

  describe('update', () => {
    it('should update a Train by id', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(trainDtoMock as never);

      const result = await controller.update(trainIdMock, trainDtoMock);

      expect(result).toEqual(trainDtoMock);
      expect(service.update).toHaveBeenCalledWith(+trainIdMock, trainDtoMock);
    });
  });

  describe('remove', () => {
    it('should delete a Train by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined as never);

      const result = await controller.remove(trainIdMock);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(+trainIdMock);
    });
  });
});
