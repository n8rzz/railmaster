import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { PrismaService } from '../prisma/prisma.service';
import { createLocationDtoMock, locationDtoMock } from './__mocks__/location.mocks';
import { LocationDto } from './dto/location.dto';
import { faker } from '@faker-js/faker';

describe('LocationsService', () => {
  const locationIdMock = 1;
  let locationsService: LocationsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, PrismaService],
    }).compile();

    locationsService = moduleRef.get<LocationsService>(LocationsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a location', async () => {
      jest.spyOn(prismaService.location, 'create').mockResolvedValue(locationDtoMock as never);

      const result = await locationsService.create(createLocationDtoMock);

      expect(result).toEqual(locationDtoMock);
      expect(prismaService.location.create).toHaveBeenCalledWith({ data: createLocationDtoMock });
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const expectedLocations = [
        locationDtoMock,
        {
          ...locationDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(prismaService.location, 'findMany').mockResolvedValue(expectedLocations as never);

      const result = await locationsService.findAll();

      expect(result).toEqual(expectedLocations);
      expect(prismaService.location.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      jest.spyOn(prismaService.location, 'findUnique').mockResolvedValue(locationDtoMock as never);

      const result = await locationsService.findOne(locationIdMock);

      expect(result).toEqual(locationDtoMock);
      expect(prismaService.location.findUnique).toHaveBeenCalledWith({
        where: { id: locationIdMock },
      });
    });
  });

  describe('update', () => {
    it('should update a location by id', async () => {
      const updatedLocationName = faker.location.city();
      const updateLocationDto: LocationDto = {
        ...locationDtoMock,
        name: updatedLocationName,
      };
      const expectedLocation = {
        ...locationDtoMock,
        name: updatedLocationName,
      };

      jest.spyOn(prismaService.location, 'update').mockResolvedValue(expectedLocation as never);

      const result = await locationsService.update(locationIdMock, updateLocationDto);

      expect(result.name).toEqual(updatedLocationName);
      expect(prismaService.location.update).toHaveBeenCalledWith({
        where: { id: locationIdMock },
        data: updateLocationDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a location by id', async () => {
      jest.spyOn(prismaService.location, 'delete').mockResolvedValue(locationDtoMock as never);

      const result = await locationsService.remove(locationIdMock);

      expect(result).toEqual(locationDtoMock);
      expect(prismaService.location.delete).toHaveBeenCalledWith({ where: { id: locationIdMock } });
    });
  });
});
