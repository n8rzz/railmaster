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
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { TrainDto } from './dto/train.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiTagName } from '../../swagger/swagger.constants';
import { AppVersion } from '../../app.constants';

@ApiBearerAuth()
@ApiTags(ApiTagName.Trains)
@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Create Train' })
  @ApiParam(CreateTrainDto)
  @ApiResponse({ status: 201, description: 'Created', type: TrainDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTrainDto: CreateTrainDto) {
    const { engines = [], railcars = [], ...trainProps } = createTrainDto;
    const engineIds = engines.map((id: number) => ({ id }));
    const railcarIds = railcars.map((id: number) => ({ id }));

    return this.trainsService.create(trainProps, engineIds, railcarIds);
  }

  @Get()
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'List Trains' })
  @ApiResponse({ status: 200, description: 'Trains List' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.trainsService.findAll();
  }

  @Get(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Find Train' })
  @ApiResponse({ status: 200, description: 'Train' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.trainsService.findOne(+id);
  }

  @Patch(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Update Train' })
  @ApiResponse({ status: 200, description: 'Success', type: TrainDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateTrainDto: Partial<TrainDto>) {
    return this.trainsService.update(+id, updateTrainDto);
  }

  @Delete(':id')
  @Version(AppVersion.One)
  @ApiOperation({ summary: 'Delete Train' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trainsService.remove(+id);
  }
}
