import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { RailcarsService } from './railcars.service';
import { CreateRailcarDto } from './dto/create-railcar.dto';
import { UpdateRailcarDto } from './dto/update-railcar.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../swagger/swagger.constants';
import { AppVersion } from '../app.constants';

@ApiBearerAuth()
@ApiTags(ApiTagName.Railcars)
@Controller('railcars')
export class RailcarsController {
  constructor(private readonly _railcarsService: RailcarsService) {}

  @Post()
  @Version(AppVersion.One)
  create(@Body() createRailcarDto: CreateRailcarDto) {
    return this._railcarsService.create(createRailcarDto);
  }

  @Get()
  @Version(AppVersion.One)
  findAll() {
    return this._railcarsService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  findOne(@Param('id') id: string) {
    return this._railcarsService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  update(@Param('id') id: string, @Body() updateRailcarDto: UpdateRailcarDto) {
    return this._railcarsService.update(+id, updateRailcarDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  remove(@Param('id') id: string) {
    return this._railcarsService.remove(+id);
  }
}
