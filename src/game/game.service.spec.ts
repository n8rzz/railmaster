import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { createGameMock, updateGameMock } from './__mocks__/game.mocks';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        PrismaService, // Add the PrismaService dependency
      ],
    }).compile();

    gameService = moduleRef.get<GameService>(GameService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a game', async () => {
      jest.spyOn(prismaService.game, 'create').mockResolvedValue(updateGameMock);

      const result = await gameService.create(createGameMock);

      expect(result).toEqual(updateGameMock);
      expect(prismaService.game.create).toHaveBeenCalledWith({ data: createGameMock });
    });

    // it('should throw InvalidGameException when create operation fails', async () => {
    //   jest.spyOn(prismaService.game, 'create').mockRejectedValue(new Error());
    //
    //   await expect(gameService.create(createGameMock)).rejects.toThrow(InvalidGameException);
    // });
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      jest.spyOn(prismaService.game, 'findMany').mockResolvedValue([updateGameMock]);

      const result = await gameService.findAll();

      expect(result).toEqual([updateGameMock]);
      expect(prismaService.game.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      const gameId = updateGameMock.id;
      jest.spyOn(prismaService.game, 'findUnique').mockResolvedValue(updateGameMock);

      const result = await gameService.findOne(gameId);

      expect(result).toEqual(updateGameMock);
      expect(prismaService.game.findUnique).toHaveBeenCalledWith({ where: { id: gameId } });
    });
  });

  describe('update', () => {
    it('should update a game by id', async () => {
      const gameId = updateGameMock.id;

      jest.spyOn(prismaService.game, 'update').mockResolvedValue(updateGameMock);

      const result = await gameService.update(gameId, updateGameMock);

      expect(result).toEqual(updateGameMock);
      expect(prismaService.game.update).toHaveBeenCalledWith({
        where: { id: gameId },
        data: updateGameMock,
      });
    });
  });

  describe('remove', () => {
    it('should delete a game by id', async () => {
      const gameId = updateGameMock.id;

      jest.spyOn(prismaService.game, 'delete').mockResolvedValue(updateGameMock);

      const result = await gameService.remove(gameId);

      expect(result).toEqual(updateGameMock);
      expect(prismaService.game.delete).toHaveBeenCalledWith({ where: { id: gameId } });
    });
  });
});
