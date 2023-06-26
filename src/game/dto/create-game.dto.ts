import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
}
