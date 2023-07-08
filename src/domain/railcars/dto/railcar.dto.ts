import { CreateRailcarDto } from './create-railcar.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RailcarDto extends CreateRailcarDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
