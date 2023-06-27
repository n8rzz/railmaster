import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

export const createGameMock: CreateGameDto = {
  name: 'Pilot Wings',
};

export const updateGameMock: UpdateGameDto = {
  id: 1,
  name: 'Starfox',
};
