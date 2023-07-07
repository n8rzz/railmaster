import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { createGameMock, gameMock } from './__mocks__/game.mocks';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let gamesService: GamesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [GamesService, PrismaService],
    }).compile();

    gamesService = moduleRef.get<GamesService>(GamesService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a game', async () => {
      jest.spyOn(prismaService.game, 'create').mockResolvedValue(gameMock);

      const result = await gamesService.create(createGameMock);

      expect(result).toEqual(gameMock);
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
      jest.spyOn(prismaService.game, 'findMany').mockResolvedValue([gameMock]);

      const result = await gamesService.findAll();

      expect(result).toEqual([gameMock]);
      expect(prismaService.game.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      const gameId = gameMock.id;
      jest.spyOn(prismaService.game, 'findUnique').mockResolvedValue(gameMock);

      const result = await gamesService.findOne(gameId);

      expect(result).toEqual(gameMock);
      expect(prismaService.game.findUnique).toHaveBeenCalledWith({ where: { id: gameId } });
    });
  });

  describe('update', () => {
    it('should update a game by id', async () => {
      const gameId = gameMock.id;

      jest.spyOn(prismaService.game, 'update').mockResolvedValue(gameMock);

      const result = await gamesService.update(gameId, gameMock);

      expect(result).toEqual(gameMock);
      expect(prismaService.game.update).toHaveBeenCalledWith({
        where: { id: gameId },
        data: gameMock,
      });
    });
  });

  describe('remove', () => {
    it('should delete a game by id', async () => {
      const gameId = gameMock.id;

      jest.spyOn(prismaService.game, 'delete').mockResolvedValue(gameMock);

      const result = await gamesService.remove(gameId);

      expect(result).toEqual(gameMock);
      expect(prismaService.game.delete).toHaveBeenCalledWith({ where: { id: gameId } });
    });
  });
});
