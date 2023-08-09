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
import { RailcarsService } from './railcars.service';
import { CreateRailcarDto } from './dto/create-railcar.dto';
import { RailcarDto } from './dto/railcar.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../../swagger/swagger.constants';
import { AppVersion } from '../../app.constants';
import { Prisma } from '@prisma/client';

@ApiBearerAuth()
@ApiTags(ApiTagName.Railcars)
@Controller('railcars')
export class RailcarsController {
  constructor(private readonly _railcarsService: RailcarsService) {}

  @Post()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Create Railcar' })
  @ApiParam(CreateRailcarDto)
  @ApiResponse({ status: 201, description: 'Created', type: RailcarDto })
  create(@Body() createRailcarDto: Prisma.RailcarCreateInput) {
    return this._railcarsService.create(createRailcarDto as never);
  }

  @Get()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'List Railcars' })
  @ApiResponse({ status: 200, description: 'Railcar List' })
  findAll() {
    return this._railcarsService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Get Railcar' })
  @ApiResponse({ status: 200, description: 'Success', type: RailcarDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this._railcarsService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Update Railcar' })
  @ApiResponse({ status: 200, description: 'Success', type: RailcarDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateRailcarDto: RailcarDto) {
    return this._railcarsService.update(+id, updateRailcarDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Delete Railcar' })
  @ApiResponse({ status: 204, description: 'Success - No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this._railcarsService.remove(+id);
  }
}
