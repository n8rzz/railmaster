import { CreateTrainDto } from './create-train.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrainDto extends CreateTrainDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
