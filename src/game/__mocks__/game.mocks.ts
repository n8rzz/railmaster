import { CreateGameDto } from '../dto/create-game.dto';
import { GameDto } from '../dto/game.dto';

export const createGameMock: CreateGameDto = {
  userId: 1,
  name: 'Pilot Wings',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const gameMock: GameDto = {
  id: 1,
  userId: 1,
  createdAt: new Date(),
  name: 'Starfox',
  updatedAt: new Date(),
};
