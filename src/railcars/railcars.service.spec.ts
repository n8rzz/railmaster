import { Test, TestingModule } from '@nestjs/testing';
import { RailcarsService } from './railcars.service';
import { PrismaService } from '../prisma/prisma.service';
import { RailcarDto } from './dto/update-railcar.dto';
import { createRailcarMock, railcarMock } from './__mocks__/railcar.mocks';

describe('RailcarsService', () => {
  const railcarIdMock = 1;
  let railcarsService: RailcarsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [RailcarsService, PrismaService],
    }).compile();

    railcarsService = moduleRef.get<RailcarsService>(RailcarsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a railcar', async () => {
      jest.spyOn(prismaService.railcar, 'create').mockResolvedValue(railcarMock);

      const result = await railcarsService.create(createRailcarMock);

      expect(result).toEqual(railcarMock);
      expect(prismaService.railcar.create).toHaveBeenCalledWith({ data: createRailcarMock });
    });
  });

  describe('findAll', () => {
    it('should return an array of railcars', async () => {
      const expectedRailcars = [
        railcarMock,
        {
          ...railcarMock,
          id: 2,
        },
      ];

      jest.spyOn(prismaService.railcar, 'findMany').mockResolvedValue(expectedRailcars);

      const result = await railcarsService.findAll();

      expect(result).toEqual(expectedRailcars);
      expect(prismaService.railcar.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a railcar by id', async () => {
      jest.spyOn(prismaService.railcar, 'findUnique').mockResolvedValue(railcarMock);

      const result = await railcarsService.findOne(railcarIdMock);

      expect(result).toEqual(railcarMock);
      expect(prismaService.railcar.findUnique).toHaveBeenCalledWith({
        where: { id: railcarIdMock },
      });
    });
  });

  describe('update', () => {
    it('should update a railcar by id', async () => {
      const updateRailcarDto: RailcarDto = {
        ...railcarMock,
        capacity_unit: 'L',
        capacity_value: 5000,
      };
      const expectedRailcar = {
        ...railcarMock,
        capacity_unit: updateRailcarDto.capacity_unit,
        capacity_value: updateRailcarDto.capacity_value,
      };

      jest.spyOn(prismaService.railcar, 'update').mockResolvedValue(expectedRailcar);

      const result = await railcarsService.update(railcarIdMock, updateRailcarDto);

      expect(result).toEqual(expectedRailcar);
      expect(prismaService.railcar.update).toHaveBeenCalledWith({
        where: { id: railcarIdMock },
        data: updateRailcarDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a railcar by id', async () => {
      // jest.spyOn(prismaService.railcar, 'delete').mockResolvedValue({ id: railcarIdMock });
      jest.spyOn(prismaService.railcar, 'delete').mockResolvedValue(railcarMock);

      const result = await railcarsService.remove(railcarIdMock);

      expect(result).toEqual(railcarMock);
      expect(prismaService.railcar.delete).toHaveBeenCalledWith({ where: { id: railcarIdMock } });
    });
  });
});
