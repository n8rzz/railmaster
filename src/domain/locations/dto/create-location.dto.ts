import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
