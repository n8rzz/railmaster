import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PrismaService } from '../prisma/prisma.service';
import { createLocationDtoMock, locationDtoMock } from './__mocks__/location.mocks';

describe('LocationsController', () => {
  const locationId = '1';
  let locationsController: LocationsController;
  let locationService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        LocationsService,
        {
          provide: PrismaService,
          useValue: () => {},
        },
      ],
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a Location', async () => {
      jest.spyOn(locationService, 'create').mockResolvedValue(locationDtoMock as never);

      const result = await locationsController.create(createLocationDtoMock);

      expect(result).toEqual(locationDtoMock);
      expect(locationService.create).toHaveBeenCalledWith(createLocationDtoMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of Locations', async () => {
      jest.spyOn(locationService, 'findAll').mockResolvedValue([locationDtoMock] as never);

      const result = await locationsController.findAll();

      expect(result).toEqual([locationDtoMock]);
      expect(locationService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a Location by id', async () => {
      jest.spyOn(locationService, 'findOne').mockResolvedValue(locationDtoMock as never);

      const result = await locationsController.findOne(locationId);

      expect(result).toEqual(locationDtoMock);
      expect(locationService.findOne).toHaveBeenCalledWith(+locationId);
    });
  });

  describe('update', () => {
    it('should update a Location by id', async () => {
      jest.spyOn(locationService, 'update').mockResolvedValue(locationDtoMock as never);

      const result = await locationsController.update(locationId, locationDtoMock);

      expect(result).toEqual(locationDtoMock);
      expect(locationService.update).toHaveBeenCalledWith(+locationId, locationDtoMock);
    });
  });

  describe('remove', () => {
    it('should delete a Location by id', async () => {
      jest.spyOn(locationService, 'remove').mockResolvedValue(undefined as never);

      const result = await locationsController.remove(locationId);

      expect(result).toBeUndefined();
      expect(locationService.remove).toHaveBeenCalledWith(+locationId);
    });
  });
});
