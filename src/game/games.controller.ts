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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GameDto } from './dto/game.dto';
import { AppVersion } from '../app.constants';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../swagger/swagger.constants';

@ApiBearerAuth()
@ApiTags(ApiTagName.Games)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Post()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Create Game' })
  @ApiParam(CreateGameDto)
  @ApiResponse({ status: 201, description: 'Created', type: GameDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'List Games' })
  @ApiResponse({ status: 200, description: 'Success', type: GameDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Show Game' })
  @ApiResponse({ status: 200, description: 'Success', type: GameDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Update Game' })
  @ApiResponse({ status: 200, description: 'Success', type: GameDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateGameDto: GameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Delete Game' })
  @ApiResponse({ status: 200, description: 'Success', type: GameDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
