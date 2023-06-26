import { CreateGameDto } from './create-game.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGameDto extends CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
