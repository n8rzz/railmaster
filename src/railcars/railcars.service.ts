import { Injectable } from '@nestjs/common';
import { CreateRailcarDto } from './dto/create-railcar.dto';
import { RailcarDto } from './dto/update-railcar.dto';

@Injectable()
export class RailcarsService {
  create(createRailcarDto: CreateRailcarDto) {
    return 'This action adds a new railcar';
  }

  findAll() {
    return `This action returns all railcars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} railcar`;
  }

  update(id: number, updateRailcarDto: RailcarDto) {
    return `This action updates a #${id} railcar`;
  }

  remove(id: number) {
    return `This action removes a #${id} railcar`;
  }
}
