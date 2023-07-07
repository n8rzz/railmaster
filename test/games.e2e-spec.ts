import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GamesService } from '../src/domain/game/games.service';
import { CreateGameDto } from '../src/domain/game/dto/create-game.dto';
import { GameDto } from '../src/domain/game/dto/game.dto';
import { gameMock } from '../src/domain/game/__mocks__/game.mocks';
import { JwtAuthGuard } from '../src/domain/auth/jwt-auth.guard';
import { AuthGuardMock } from '../src/domain/auth/__mocks__/auth.guard.mock';

describe('GamesController (e2e)', () => {
  const currentDate = new Date();
  const createGameDto: CreateGameDto = {
    name: 'An e2e Game Name',
    userId: 1,
  };
  const expectedGame: GameDto = {
    ...createGameDto,
    id: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  let app: INestApplication;
  let gameService: GamesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    gameService = moduleFixture.get<GamesService>(GamesService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /games', () => {
    it('should create a game', async () => {
      jest.spyOn(gameService, 'create').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .post('/games')
        .send(createGameDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.name).toEqual(expectedGame.name);
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(gameService.create).toHaveBeenCalled();
    });
  });

  describe('GET /games', () => {
    it('should return an array of games', async () => {
      const expectedGames = [
        gameMock,
        {
          ...gameMock,
          id: 2,
        },
      ];

      jest.spyOn(gameService, 'findAll').mockResolvedValue(expectedGames);

      const response = await request(app.getHttpServer()).get('/games').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedGames.length);
      expect(gameService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /games/:id', () => {
    it('should return a game by id', async () => {
      const gameId = '1';

      jest.spyOn(gameService, 'findOne').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .get(`/games/${gameId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expectedGame.id);
      expect(response.body.name).toEqual(expectedGame.name);
      expect(gameService.findOne).toHaveBeenCalledWith(+gameId);
    });
  });

  describe('PATCH /games/:id', () => {
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
        .patch(`/games/${gameId}`)
        .send(updateGameDto)
        .expect(HttpStatus.OK);

      expect(response.body.name).toEqual(expectedGame.name);
      expect(gameService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /games/:id', () => {
    it('should delete a game by id', async () => {
      const gameId = '1';

      jest.spyOn(gameService, 'remove').mockResolvedValue(gameMock);

      const response = await request(app.getHttpServer())
        .delete(`/games/${gameId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(gameService.remove).toHaveBeenCalledWith(+gameId);
    });
  });
});
