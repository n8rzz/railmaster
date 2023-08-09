import { CreateEngineDto } from '../dto/create-engine.dto';
import { EngineDto } from '../dto/engine.dto';
import { locationDtoMock } from '../../locations/__mocks__/location.mocks';

export const createEngineDtoMock: CreateEngineDto = {
  fuelEfficiency: 10,
  power: 4000,
  status: 'active',
  type: 'Diesel/Electric',
  locationId: locationDtoMock.id,
  userId: 1,
};

export const engineDtoMock: EngineDto = {
  ...createEngineDtoMock,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
