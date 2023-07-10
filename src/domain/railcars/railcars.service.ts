import { Injectable } from '@nestjs/common';
import { CreateRailcarDto } from './dto/create-railcar.dto';
import { RailcarDto } from './dto/railcar.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Railcar } from './entities/railcar.entity';

@Injectable()
export class RailcarsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createRailcarDto: CreateRailcarDto): Promise<Railcar> {
    return this._prismaService.railcar.create({ data: createRailcarDto });
  }

  findAll(): Promise<Railcar[]> {
    return this._prismaService.railcar.findMany();
  }

  findOne(id: number): Promise<Railcar | null> {
    return this._prismaService.railcar.findUnique({ where: { id } });
  }

  update(id: number, updateRailcarDto: RailcarDto): Promise<Railcar> {
    return this._prismaService.railcar.update({
      where: { id },
      data: { ...updateRailcarDto },
    });
  }

  remove(id: number): Promise<Railcar> {
    return this._prismaService.railcar.delete({ where: { id } });
  }
}
