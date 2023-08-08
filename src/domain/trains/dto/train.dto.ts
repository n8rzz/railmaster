import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EngineDto } from '../../engines/dto/engine.dto';
import { RailcarDto } from '../../railcars/dto/railcar.dto';

export class TrainDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public capacity: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public maxSpeed: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public status: string;

  @IsArray()
  @ApiProperty()
  public engines: EngineDto[];

  @IsArray()
  @ApiProperty()
  public railcars: RailcarDto[];

  @ApiProperty({ required: false })
  public updatedAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public userId: number;
}
