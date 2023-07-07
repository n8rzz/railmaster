import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnginesService {
  constructor(private readonly _prismaService: PrismaService) {}
  create(createEngineDto: CreateEngineDto) {
    return this._prismaService.engine.create({ data: createEngineDto });
  }

  findAll() {
    return this._prismaService.engine.findMany();
  }

  findOne(id: number) {
    return this._prismaService.engine.findUnique({ where: { id } });
  }

  update(id: number, updateEngineDto: EngineDto) {
    return this._prismaService.engine.update({
      where: { id },
      data: { ...updateEngineDto },
    });
  }

  remove(id: number) {
    return this._prismaService.engine.delete({ where: { id } });
  }
}
