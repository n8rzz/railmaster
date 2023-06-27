import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GameService } from '../src/game/game.service';
import { CreateGameDto } from '../src/game/dto/create-game.dto';
import { UpdateGameDto } from '../src/game/dto/update-game.dto';
import { updateGameMock } from '../src/game/__mocks__/game.mocks';

describe('GameController (e2e)', () => {
  const createGameDto: CreateGameDto = {
    name: 'An e2e Game Name',
  };
  const expectedGame: UpdateGameDto = {
    id: 1,
    name: createGameDto.name,
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

      expect(response.body).toEqual(expectedGame);
      expect(gameService.create).toHaveBeenCalledWith(createGameDto);
    });
  });

  describe('GET /game', () => {
    it('should return an array of games', async () => {
      const expectedGames = [
        updateGameMock,
        {
          id: 2,
          name: 'Threeve',
        },
      ];

      jest.spyOn(gameService, 'findAll').mockResolvedValue(expectedGames);

      const response = await request(app.getHttpServer()).get('/game').expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedGames);
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

      expect(response.body).toEqual(expectedGame);
      expect(gameService.findOne).toHaveBeenCalledWith(+gameId);
    });
  });

  describe('PATCH /game/:id', () => {
    it('should update a game by id', async () => {
      const gameId = 1;
      const updateGameDto: UpdateGameDto = {
        id: gameId,
        name: 'An Updated e2e Game Name',
      };
      const expectedGame = {
        id: gameId,
        name: updateGameDto.name,
      };

      jest.spyOn(gameService, 'update').mockResolvedValue(expectedGame);

      const response = await request(app.getHttpServer())
        .patch(`/game/${gameId}`)
        .send(updateGameDto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(expectedGame);
      expect(gameService.update).toHaveBeenCalledWith(+gameId, updateGameDto);
    });
  });

  describe('DELETE /game/:id', () => {
    it('should delete a game by id', async () => {
      const gameId = '1';

      jest.spyOn(gameService, 'remove').mockResolvedValue(updateGameMock);

      const response = await request(app.getHttpServer())
        .delete(`/game/${gameId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(gameService.remove).toHaveBeenCalledWith(+gameId);
    });
  });
});
