import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  maxSpeed: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
