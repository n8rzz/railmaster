import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameDto } from './dto/game.dto';
import { AppVersion } from '../app.constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Version(AppVersion.One)
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Version(AppVersion.One)
  findAll() {
    return this.gameService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Version(AppVersion.One)
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Version(AppVersion.One)
  update(@Param('id') id: string, @Body() updateGameDto: GameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Version(AppVersion.One)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
