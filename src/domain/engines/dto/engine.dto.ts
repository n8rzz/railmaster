import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateEngineDto } from './create-engine.dto';

export class EngineDto extends CreateEngineDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  locationId: number;
}
