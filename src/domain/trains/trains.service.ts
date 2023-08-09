import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { TrainDto } from './dto/train.dto';

@Injectable()
export class TrainsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(
    createTrainDto: Omit<CreateTrainDto, 'engines' | 'railcars'>,
    engineIds: { id: number }[] = [],
    railcarIds: { id: number }[] = [],
  ) {
    return this._prismaService.train.create({
      data: {
        ...createTrainDto,
        engines: {
          connect: engineIds,
        },
        railcars: {
          connect: railcarIds,
        },
      },
      include: { engines: true, railcars: true, location: true },
    });
  }

  findAll() {
    return this._prismaService.train.findMany({
      include: { engines: true, railcars: true, location: true },
    });
  }

  findOne(id: number) {
    return this._prismaService.train.findUnique({
      where: { id },
      include: { engines: true, railcars: true, location: true },
    });
  }

  update(id: number, updateTrainDto: Partial<TrainDto>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { railcars, engines, ...trainToUpdate } = updateTrainDto;

    return this._prismaService.train.update({
      where: { id },
      data: { ...trainToUpdate },
      include: { engines: true, railcars: true, location: true },
    });
  }

  remove(id: number) {
    return this._prismaService.train.delete({ where: { id } });
  }

  addEngines(id: number, engineIds: number[]) {
    return this._prismaService.train.update({
      where: { id },
      data: {
        engines: {
          connect: engineIds.map((id) => ({ id })),
        },
      },
      include: { engines: true, railcars: true, location: true },
    });
  }

  removeEngines(id: number, engineIds: number[]) {
    return this._prismaService.train.update({
      where: { id },
      data: {
        engines: {
          disconnect: engineIds.map((id) => ({ id })),
        },
      },
      include: { engines: true, railcars: true, location: true },
    });
  }

  addRailcars(id: number, railcarIds: number[]) {
    return this._prismaService.train.update({
      where: { id },
      data: {
        railcars: {
          connect: railcarIds.map((id) => ({ id })),
        },
      },
      include: { engines: true, railcars: true, location: true },
    });
  }

  removeRailcars(id: number, railcarIds: number[]) {
    return this._prismaService.train.update({
      where: { id },
      data: {
        railcars: {
          disconnect: railcarIds.map((id) => ({ id })),
        },
      },
      include: { engines: true, railcars: true, location: true },
    });
  }
}
