import { CreateGameDto } from './create-game.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GameDto extends CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
