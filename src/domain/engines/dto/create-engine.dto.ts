import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateEngineDto implements Prisma.EngineCreateInput {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public fuelEfficiency: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public power: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public status: string;

  @ApiProperty({ required: false })
  public trainId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  locationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public userId: number;
}
