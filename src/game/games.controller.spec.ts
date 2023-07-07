import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { createGameMock, gameMock } from './__mocks__/game.mocks';
import { PrismaService } from '../prisma/prisma.service';

describe('GamesController', () => {
  let gamesController: GamesController;
  let gamesService: GamesService;
  const gameId = `${gameMock.id}`;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        GamesService,
        {
          provide: PrismaService,
          useValue: () => {},
        },
      ],
    }).compile();

    gamesController = moduleRef.get<GamesController>(GamesController);
    gamesService = moduleRef.get<GamesService>(GamesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a game', async () => {
      jest.spyOn(gamesService, 'create').mockResolvedValue(gameMock);

      const result = await gamesController.create(createGameMock);

      expect(result).toEqual(gameMock);
      expect(gamesService.create).toHaveBeenCalledWith(createGameMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      jest.spyOn(gamesService, 'findAll').mockResolvedValue([gameMock]);

      const result = await gamesController.findAll();

      expect(result).toEqual([gameMock]);
      expect(gamesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      jest.spyOn(gamesService, 'findOne').mockResolvedValue(gameMock);

      const result = await gamesController.findOne(gameId);

      expect(result).toEqual(gameMock);
      expect(gamesService.findOne).toHaveBeenCalledWith(+gameId);
    });
  });

  describe('update', () => {
    it('should update a game by id', async () => {
      jest.spyOn(gamesService, 'update').mockResolvedValue(gameMock);

      const result = await gamesController.update(gameId, gameMock);

      expect(result).toEqual(gameMock);
      expect(gamesService.update).toHaveBeenCalledWith(+gameId, gameMock);
    });
  });

  describe('remove', () => {
    it('should delete a game by id', async () => {
      jest.spyOn(gamesService, 'remove').mockResolvedValue(undefined as never);

      const result = await gamesController.remove(gameId);

      expect(result).toBeUndefined();
      expect(gamesService.remove).toHaveBeenCalledWith(+gameId);
    });
  });
});
