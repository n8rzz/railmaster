import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRailcarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  capacity_unit: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  capacity_value: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
