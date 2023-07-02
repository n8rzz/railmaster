import { CreateGameDto } from './create-game.dto';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class GameDto extends CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
