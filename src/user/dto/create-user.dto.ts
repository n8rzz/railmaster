import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDate()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  email: string;

  // @IsArray()
  // @IsNotEmpty()
  // games: GameDto[];

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;
}
