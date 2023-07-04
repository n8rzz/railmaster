import { PartialType } from '@nestjs/swagger';
import { CreateRailcarDto } from './create-railcar.dto';

export class UpdateRailcarDto extends PartialType(CreateRailcarDto) {}
