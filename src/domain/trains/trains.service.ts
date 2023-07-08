import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { TrainDto } from './dto/train.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createTrainDto: CreateTrainDto) {
    return this._prismaService.train.create({ data: createTrainDto });
  }

  findAll() {
    return this._prismaService.train.findMany();
  }

  findOne(id: number) {
    return this._prismaService.train.findUnique({ where: { id } });
  }

  update(id: number, updateTrainDto: Partial<TrainDto>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { railcars, engines, ...trainToUpdate } = updateTrainDto;

    return this._prismaService.train.update({
      where: { id },
      data: { ...trainToUpdate },
    });
  }

  remove(id: number) {
    return this._prismaService.train.delete({ where: { id } });
  }
}
