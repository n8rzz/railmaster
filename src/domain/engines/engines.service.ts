import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Engine } from './entities/engine.entity';

@Injectable()
export class EnginesService {
  constructor(private readonly _prismaService: PrismaService) {}
  create(createEngineDto: CreateEngineDto): Promise<Engine> {
    return this._prismaService.engine.create({ data: createEngineDto });
  }

  findAll(): Promise<Engine[]> {
    return this._prismaService.engine.findMany();
  }

  findOne(id: number): Promise<Engine | null> {
    return this._prismaService.engine.findUnique({ where: { id } });
  }

  update(id: number, updateEngineDto: EngineDto): Promise<Engine> {
    return this._prismaService.engine.update({
      where: { id },
      data: { ...updateEngineDto },
    });
  }

  remove(id: number): Promise<Engine> {
    return this._prismaService.engine.delete({ where: { id } });
  }
}
