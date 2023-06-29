import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GameService } from '../src/game/game.service';
import { CreateGameDto } from '../src/game/dto/create-game.dto';
import { GameDto } from '../src/game/dto/game.dto';
import { gameMock } from '../src/game/__mocks__/game.mocks';

describe('GameController (e2e)', () => {
  const currentDate = new Date();
  const createGameDto: CreateGameDto = {
    name: 'An e2e Game Name',
    createdAt: currentDate,
    updatedAt: currentDate,
    userId: 1,
  };
  const expectedGame: GameDto = {
    id: 1,
    ...createGameDto,
  };
  let app: INestApplication;
  let gameService: GameService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    gameService = moduleFixture.get<GameService>(GameService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /game', () => {
    it('should create a game', async () => {
      jest.spyOn(gameService, 'create').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .post('/game')
        .send(createGameDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.name).toEqual(expectedGame.name);
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(gameService.create).toHaveBeenCalled();
    });
  });

  describe('GET /game', () => {
    it('should return an array of games', async () => {
      const expectedGames = [
        gameMock,
        {
          ...gameMock,
          id: 2,
        },
      ];

      jest.spyOn(gameService, 'findAll').mockResolvedValue(expectedGames);

      const response = await request(app.getHttpServer()).get('/game').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedGames.length);
      expect(gameService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /game/:id', () => {
    it('should return a game by id', async () => {
      const gameId = '1';

      jest.spyOn(gameService, 'findOne').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .get(`/game/${gameId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expectedGame.id);
      expect(response.body.name).toEqual(expectedGame.name);
      expect(gameService.findOne).toHaveBeenCalledWith(+gameId);
    });
  });

  describe('PATCH /game/:id', () => {
    it('should update a game by id', async () => {
      const gameId = 1;
      const updateGameDto: GameDto = {
        id: gameId,
        name: 'An Updated e2e Game Name',
        createdAt: currentDate,
        updatedAt: currentDate,
        userId: 1,
      };
      const expectedGame = {
        ...updateGameDto,
        createdAt: currentDate,
        name: updateGameDto.name,
        updatedAt: currentDate,
      };

      jest.spyOn(gameService, 'update').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .patch(`/game/${gameId}`)
        .send(updateGameDto)
        .expect(HttpStatus.OK);

      expect(response.body.name).toEqual(expectedGame.name);
      expect(gameService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /game/:id', () => {
    it('should delete a game by id', async () => {
      const gameId = '1';

      jest.spyOn(gameService, 'remove').mockResolvedValue(gameMock);

      const response = await request(app.getHttpServer())
        .delete(`/game/${gameId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(gameService.remove).toHaveBeenCalledWith(+gameId);
    });
  });
});
