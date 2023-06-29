import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
