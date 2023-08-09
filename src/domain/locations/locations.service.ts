import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationDto } from './dto/location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(createLocationDto: CreateLocationDto): Promise<Location> {
    return this._prismaService.location.create({ data: createLocationDto });
  }

  findAll(): Promise<Location[]> {
    return this._prismaService.location.findMany();
  }

  findOne(id: number): Promise<Location | null> {
    return this._prismaService.location.findUnique({ where: { id } });
  }

  update(id: number, updateLocationDto: LocationDto): Promise<Location> {
    return this._prismaService.location.update({
      where: { id },
      data: { ...updateLocationDto },
    });
  }

  remove(id: number): Promise<Location> {
    return this._prismaService.location.delete({ where: { id } });
  }
}
