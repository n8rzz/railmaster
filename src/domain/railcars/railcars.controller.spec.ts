import { Test, TestingModule } from '@nestjs/testing';
import { RailcarsService } from './railcars.service';
import { PrismaService } from '../prisma/prisma.service';
import { createRailcarMock, railcarMock } from './__mocks__/railcar.mocks';
import { RailcarsController } from './railcars.controller';

describe('RailcarsController', () => {
  const railcarId = '1';
  let railcarsController: RailcarsController;
  let railcarService: RailcarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RailcarsController],
      providers: [
        RailcarsService,
        {
          provide: PrismaService,
          useValue: () => {},
        },
      ],
    }).compile();

    railcarsController = module.get<RailcarsController>(RailcarsController);
    railcarService = module.get<RailcarsService>(RailcarsService);
  });

  it('should be defined', () => {
    expect(railcarsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a Railcar', async () => {
      jest.spyOn(railcarService, 'create').mockResolvedValue(railcarMock as never);

      const result = await railcarsController.create(createRailcarMock);

      expect(result).toEqual(railcarMock);
      expect(railcarService.create).toHaveBeenCalledWith(createRailcarMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of Railcars', async () => {
      jest.spyOn(railcarService, 'findAll').mockResolvedValue([railcarMock] as never);

      const result = await railcarsController.findAll();

      expect(result).toEqual([railcarMock]);
      expect(railcarService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a Railcar by id', async () => {
      jest.spyOn(railcarService, 'findOne').mockResolvedValue(railcarMock as never);

      const result = await railcarsController.findOne(railcarId);

      expect(result).toEqual(railcarMock);
      expect(railcarService.findOne).toHaveBeenCalledWith(+railcarId);
    });
  });

  describe('update', () => {
    it('should update a Railcar by id', async () => {
      jest.spyOn(railcarService, 'update').mockResolvedValue(railcarMock as never);

      const result = await railcarsController.update(railcarId, railcarMock);

      expect(result).toEqual(railcarMock);
      expect(railcarService.update).toHaveBeenCalledWith(+railcarId, railcarMock);
    });
  });

  describe('remove', () => {
    it('should delete a Railcar by id', async () => {
      jest.spyOn(railcarService, 'remove').mockResolvedValue(undefined as never);

      const result = await railcarsController.remove(railcarId);

      expect(result).toBeUndefined();
      expect(railcarService.remove).toHaveBeenCalledWith(+railcarId);
    });
  });
});
