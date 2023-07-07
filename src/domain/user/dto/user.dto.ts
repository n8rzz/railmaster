import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
