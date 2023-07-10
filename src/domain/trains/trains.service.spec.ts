import { Test, TestingModule } from '@nestjs/testing';
import { TrainsService } from './trains.service';
import { PrismaService } from '../prisma/prisma.service';
import { createTrainDtoMock, trainDtoMock } from './__mocks__/trains.mocks';
import { TrainDto } from './dto/train.dto';

describe('TrainsService', () => {
  const trainIdMock = 1;
  let trainsService: TrainsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [TrainsService, PrismaService],
    }).compile();

    trainsService = moduleRef.get<TrainsService>(TrainsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a train', async () => {
      jest.spyOn(prismaService.train, 'create').mockResolvedValue(trainDtoMock as never);

      const result = await trainsService.create(createTrainDtoMock);

      expect(result).toEqual(trainDtoMock);
      expect(prismaService.train.create).toHaveBeenCalledWith({
        data: {
          ...createTrainDtoMock,
          engines: { connect: [] },
          railcars: { connect: [] },
        },
        include: { engines: true, railcars: true },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of trains', async () => {
      const expectedRailcars = [
        trainDtoMock,
        {
          ...trainDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(prismaService.train, 'findMany').mockResolvedValue(expectedRailcars as never);

      const result = await trainsService.findAll();

      expect(result).toEqual(expectedRailcars);
      expect(prismaService.train.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a train by id', async () => {
      jest.spyOn(prismaService.train, 'findUnique').mockResolvedValue(trainDtoMock as never);

      const result = await trainsService.findOne(trainIdMock);

      expect(result).toEqual(trainDtoMock);
      expect(prismaService.train.findUnique).toHaveBeenCalledWith({
        where: { id: trainIdMock },
        include: { engines: true, railcars: true },
      });
    });
  });

  describe('update', () => {
    it('should update a train by id', async () => {
      const updateTrainDto: TrainDto = {
        ...trainDtoMock,
        maxSpeed: 100,
      };
      const expectedRailcar: TrainDto = {
        ...trainDtoMock,
        maxSpeed: updateTrainDto.maxSpeed,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { engines, railcars, ...expectedCallSignature } = expectedRailcar;

      jest.spyOn(prismaService.train, 'update').mockResolvedValue(expectedRailcar as never);

      const result = await trainsService.update(trainIdMock, updateTrainDto);

      expect(result).toEqual(expectedRailcar);
      expect(prismaService.train.update).toHaveBeenCalledWith({
        where: { id: trainIdMock },
        data: expectedCallSignature,
        include: { engines: true, railcars: true },
      });
    });
  });

  describe('remove', () => {
    it('should delete a train by id', async () => {
      // jest.spyOn(prismaService.train, 'delete').mockResolvedValue({ id as never: trainIdMock });
      jest.spyOn(prismaService.train, 'delete').mockResolvedValue(trainDtoMock as never);

      const result = await trainsService.remove(trainIdMock);

      expect(result).toEqual(trainDtoMock);
      expect(prismaService.train.delete).toHaveBeenCalledWith({
        where: { id: trainIdMock },
      });
    });
  });
});
