import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsDate()
  @ApiProperty({ required: false })
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsDate()
  @ApiProperty({ required: false })
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  username: string;
}
