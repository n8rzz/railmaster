import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRailcarsDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  railcarIds: number[];
}
