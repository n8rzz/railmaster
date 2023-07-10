import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EnginesService } from './engines.service';
import { createEngineDtoMock, engineDtoMock } from './__mocks__/engine.mocks';
import { EngineDto } from './dto/engine.dto';

describe('EnginesService', () => {
  const engineIdMock = 1;
  let enginesService: EnginesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [EnginesService, PrismaService],
    }).compile();

    enginesService = moduleRef.get<EnginesService>(EnginesService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a engine', async () => {
      jest.spyOn(prismaService.engine, 'create').mockResolvedValue(engineDtoMock as never);

      const result = await enginesService.create(createEngineDtoMock);

      expect(result).toEqual(engineDtoMock);
      expect(prismaService.engine.create).toHaveBeenCalledWith({ data: createEngineDtoMock });
    });
  });

  describe('findAll', () => {
    it('should return an array of engines', async () => {
      const expectedEngines = [
        engineDtoMock,
        {
          ...engineDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(prismaService.engine, 'findMany').mockResolvedValue(expectedEngines as never);

      const result = await enginesService.findAll();

      expect(result).toEqual(expectedEngines);
      expect(prismaService.engine.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a engine by id', async () => {
      jest.spyOn(prismaService.engine, 'findUnique').mockResolvedValue(engineDtoMock as never);

      const result = await enginesService.findOne(engineIdMock);

      expect(result).toEqual(engineDtoMock);
      expect(prismaService.engine.findUnique).toHaveBeenCalledWith({
        where: { id: engineIdMock },
      });
    });
  });

  describe('update', () => {
    it('should update a engine by id', async () => {
      const updateRailcarDto: EngineDto = {
        ...engineDtoMock,
        power: 50,
      };
      const expectedEngine = {
        ...engineDtoMock,
        power: updateRailcarDto.power,
      };

      jest.spyOn(prismaService.engine, 'update').mockResolvedValue(expectedEngine as never);

      const result = await enginesService.update(engineIdMock, updateRailcarDto);

      expect(result).toEqual(expectedEngine);
      expect(prismaService.engine.update).toHaveBeenCalledWith({
        where: { id: engineIdMock },
        data: updateRailcarDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a engine by id', async () => {
      // jest.spyOn(prismaService.engine, 'delete').mockResolvedValue({ id: engineIdMock });
      jest.spyOn(prismaService.engine, 'delete').mockResolvedValue(engineDtoMock as never);

      const result = await enginesService.remove(engineIdMock);

      expect(result).toEqual(engineDtoMock);
      expect(prismaService.engine.delete).toHaveBeenCalledWith({ where: { id: engineIdMock } });
    });
  });
});
