import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { createGameMock, gameMock } from './__mocks__/game.mocks';
import { PrismaService } from '../prisma/prisma.service';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;
  const gameId = `${gameMock.id}`;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        {
          provide: PrismaService,
          useValue: () => {},
        },
      ],
    }).compile();

    gameController = moduleRef.get<GameController>(GameController);
    gameService = moduleRef.get<GameService>(GameService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a game', async () => {
      jest.spyOn(gameService, 'create').mockResolvedValue(gameMock);

      const result = await gameController.create(createGameMock);

      expect(result).toEqual(gameMock);
      expect(gameService.create).toHaveBeenCalledWith(createGameMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      jest.spyOn(gameService, 'findAll').mockResolvedValue([gameMock]);

      const result = await gameController.findAll();

      expect(result).toEqual([gameMock]);
      expect(gameService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      jest.spyOn(gameService, 'findOne').mockResolvedValue(gameMock);

      const result = await gameController.findOne(gameId);

      expect(result).toEqual(gameMock);
      expect(gameService.findOne).toHaveBeenCalledWith(+gameId);
    });
  });

  describe('update', () => {
    it('should update a game by id', async () => {
      jest.spyOn(gameService, 'update').mockResolvedValue(gameMock);

      const result = await gameController.update(gameId, gameMock);

      expect(result).toEqual(gameMock);
      expect(gameService.update).toHaveBeenCalledWith(+gameId, gameMock);
    });
  });

  describe('remove', () => {
    it('should delete a game by id', async () => {
      jest.spyOn(gameService, 'remove').mockResolvedValue(undefined as never);

      const result = await gameController.remove(gameId);

      expect(result).toBeUndefined();
      expect(gameService.remove).toHaveBeenCalledWith(+gameId);
    });
  });
});
