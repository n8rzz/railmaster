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
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationDto } from './dto/location.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../../swagger/swagger.constants';
import { AppVersion } from '../../app.constants';
import { CreateRailcarDto } from '../railcars/dto/create-railcar.dto';

@ApiBearerAuth()
@ApiTags(ApiTagName.Locations)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @Post()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Create Location' })
  @ApiParam(CreateRailcarDto)
  @ApiResponse({ status: 201, description: 'Created', type: LocationDto })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'List Locations' })
  @ApiResponse({ status: 200, description: 'Location List' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Get Location' })
  @ApiResponse({ status: 200, description: 'Success', type: LocationDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Update Location' })
  @ApiResponse({ status: 200, description: 'Success', type: LocationDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateLocationDto: LocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Delete Location' })
  @ApiResponse({ status: 204, description: 'Success - No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
