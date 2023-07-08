import { CreateTrainDto } from './create-train.dto';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EngineDto } from '../../engines/dto/engine.dto';
import { RailcarDto } from '../../railcars/dto/railcar.dto';

export class TrainDto extends CreateTrainDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @IsArray()
  @ApiProperty()
  engines: EngineDto[];

  @IsArray()
  @ApiProperty()
  railcars: RailcarDto[];

  @ApiProperty({ required: false })
  updatedAt: Date;
}
