import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly _prismaService: PrismaService) {}
  create(createGameDto: CreateGameDto) {
    return this._prismaService.game.create({ data: createGameDto });
  }

  findAll() {
    return this._prismaService.game.findMany();
  }

  findOne(id: number) {
    return this._prismaService.game.findUnique({ where: { id } });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this._prismaService.game.update({
      where: { id },
      data: { ...updateGameDto },
    });
  }

  remove(id: number) {
    return this._prismaService.game.delete({ where: { id } });
  }
}
