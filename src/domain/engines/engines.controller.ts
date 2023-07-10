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
import { EnginesService } from './engines.service';
import { CreateEngineDto } from './dto/create-engine.dto';
import { EngineDto } from './dto/engine.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../../swagger/swagger.constants';
import { AppVersion } from '../../app.constants';
import { Prisma } from '@prisma/client';

@ApiBearerAuth()
@ApiTags(ApiTagName.Engines)
@Controller('engines')
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Post()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Create Engine' })
  @ApiParam(CreateEngineDto)
  @ApiResponse({ status: 201, description: 'Created', type: EngineDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createEngineDto: Prisma.EngineCreateInput) {
    return this.enginesService.create(createEngineDto as never);
  }

  @Get()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'List Engines' })
  @ApiResponse({ status: 200, description: 'Engine List' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.enginesService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Get Engine' })
  @ApiResponse({ status: 200, description: 'Success', type: EngineDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.enginesService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Update Engine' })
  @ApiResponse({ status: 200, description: 'Success', type: EngineDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateEngineDto: EngineDto) {
    return this.enginesService.update(+id, updateEngineDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Delete Engine' })
  @ApiResponse({ status: 204, description: 'Success - No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.enginesService.remove(+id);
  }
}
