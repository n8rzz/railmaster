import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateTrainDto implements Prisma.TrainCreateInput {
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
