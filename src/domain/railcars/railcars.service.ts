import { Injectable } from '@nestjs/common';
import { CreateRailcarDto } from './dto/create-railcar.dto';
import { RailcarDto } from './dto/update-railcar.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RailcarsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createRailcarDto: CreateRailcarDto) {
    return this._prismaService.railcar.create({ data: createRailcarDto });
  }

  findAll() {
    return this._prismaService.railcar.findMany();
  }

  findOne(id: number) {
    return this._prismaService.railcar.findUnique({ where: { id } });
  }

  update(id: number, updateRailcarDto: RailcarDto) {
    return this._prismaService.railcar.update({
      where: { id },
      data: { ...updateRailcarDto },
    });
  }

  remove(id: number) {
    return this._prismaService.railcar.delete({ where: { id } });
  }
}
