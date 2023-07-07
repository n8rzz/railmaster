import { CreateRailcarDto } from '../dto/create-railcar.dto';
import { RailcarDto } from '../dto/update-railcar.dto';

export const createRailcarMock: CreateRailcarDto = {
  capacity_unit: 'gal',
  capacity_value: 10000,
  type: 'tank',
  userId: 1,
};

export const railcarMock: RailcarDto = {
  ...createRailcarMock,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
