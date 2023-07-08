import { CreateTrainDto } from '../dto/create-train.dto';
import { TrainDto } from '../dto/train.dto';

export const createTrainDtoMock: CreateTrainDto = {
  capacity: 100,
  maxSpeed: 80,
  status: 'parked',
  userId: 1,
};

export const trainDtoMock: TrainDto = {
  ...createTrainDtoMock,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
