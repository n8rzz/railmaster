import { IsDate, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
