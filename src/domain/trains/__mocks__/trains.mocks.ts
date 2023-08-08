import { CreateTrainDto } from '../dto/create-train.dto';
import { TrainDto } from '../dto/train.dto';
import { UpdateRailcarsDto } from '../dto/update-railcars.dto';
import { RailcarDto } from '../../railcars/dto/railcar.dto';

const now = new Date();

export const createTrainDtoMock: CreateTrainDto = {
  capacity: 100,
  maxSpeed: 80,
  status: 'parked',
  userId: 1,
};

export const createTrainWithAssociationsDtoMock: CreateTrainDto = {
  ...createTrainDtoMock,
  engines: [1],
  railcars: [1],
};

export const trainDtoMock: TrainDto = {
  ...createTrainDtoMock,
  id: 1,
  createdAt: now,
  engines: [],
  railcars: [],
  updatedAt: now,
};

export const updateRailcarsMock: UpdateRailcarsDto = { railcarIds: [1, 2] };
export const updateRailcarsResponseMock: TrainDto = {
  ...trainDtoMock,
  railcars: [
    {
      id: 1,
    } as RailcarDto,
  ],
};
