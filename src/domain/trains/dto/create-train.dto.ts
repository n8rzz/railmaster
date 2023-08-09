import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

class PrimaCreateTrainDto implements Prisma.TrainCreateInput {
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
  locationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}

/**
 * We expose `#engines` and `3railcars` here as arrays for easy nested creation via
 * api, these are custom types and not part of the PrismClient
 */
export class CreateTrainDto extends PrimaCreateTrainDto {
  @ApiProperty({ required: false })
  engines?: number[];

  @ApiProperty({ required: false })
  railcars?: number[];
}
