import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnginesService } from './engines.service';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';

@Controller('engines')
export class EnginesController {
  constructor(private readonly enginesService: EnginesService) {}

  @Post()
  create(@Body() createEngineDto: CreateEngineDto) {
    return this.enginesService.create(createEngineDto);
  }

  @Get()
  findAll() {
    return this.enginesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enginesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngineDto: UpdateEngineDto) {
    return this.enginesService.update(+id, updateEngineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enginesService.remove(+id);
  }
}
