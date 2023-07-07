import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';

@Injectable()
export class EnginesService {
  create(createEngineDto: CreateEngineDto) {
    return 'This action adds a new engine';
  }

  findAll() {
    return `This action returns all engines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engine`;
  }

  update(id: number, updateEngineDto: EngineDto) {
    return `This action updates a #${id} engine`;
  }

  remove(id: number) {
    return `This action removes a #${id} engine`;
  }
}
