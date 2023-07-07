import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
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

  update(id: number, updateGameDto: GameDto) {
    return this._prismaService.game.update({
      where: { id },
      data: { ...updateGameDto },
    });
  }

  remove(id: number) {
    return this._prismaService.game.delete({ where: { id } });
  }
}
