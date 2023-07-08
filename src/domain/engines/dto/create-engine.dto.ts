import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEngineDto {
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
  trainId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public userId: number;
}
