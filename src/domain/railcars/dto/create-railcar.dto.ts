import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRailcarDto implements Prisma.RailcarCreateInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public capacity_unit: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public capacity_value: number;

  @ApiProperty({ required: false })
  public trainId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public locationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public userId: number;
}
