import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
