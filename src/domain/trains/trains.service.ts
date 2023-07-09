import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { TrainDto } from './dto/train.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createTrainDto: CreateTrainDto) {
    return this._prismaService.train.create({
      data: createTrainDto,
      include: { engines: true, railcars: true },
    });
  }

  findAll() {
    return this._prismaService.train.findMany({
      include: { engines: true, railcars: true },
    });
  }

  findOne(id: number) {
    return this._prismaService.train.findUnique({
      where: { id },
      include: { engines: true, railcars: true },
    });
  }

  update(id: number, updateTrainDto: Partial<TrainDto>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { railcars, engines, ...trainToUpdate } = updateTrainDto;

    return this._prismaService.train.update({
      where: { id },
      data: { ...trainToUpdate },
      include: { engines: true, railcars: true },
    });
  }

  remove(id: number) {
    return this._prismaService.train.delete({ where: { id } });
  }
}
