import { CreateRailcarDto } from '../dto/create-railcar.dto';
import { RailcarDto } from '../dto/railcar.dto';
import { locationDtoMock } from '../../locations/__mocks__/location.mocks';

const now = new Date();

export const createRailcarMock: CreateRailcarDto = {
  capacity_unit: 'gal',
  capacity_value: 10000,
  trainId: 1,
  type: 'tank',
  locationId: locationDtoMock.id,
  userId: 1,
};

export const railcarMock: RailcarDto = {
  ...createRailcarMock,
  id: 1,
  createdAt: now,
  updatedAt: now,
};
