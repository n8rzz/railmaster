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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
