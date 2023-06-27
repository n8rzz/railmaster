import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AppVersion } from '../app.constants';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @Version(AppVersion.One)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @Version(AppVersion.One)
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @Version(AppVersion.One)
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
