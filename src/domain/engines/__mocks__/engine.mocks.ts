import { CreateEngineDto } from '../dto/create-engine.dto';
import { EngineDto } from '../dto/engine.dto';

export const createEngineMock: CreateEngineDto = {
  fuelEfficiency: 10,
  power: 4000,
  status: 'active',
  type: 'Diesel/Electric',
  userId: 1,
};

export const engineMock: EngineDto = {
  ...createEngineMock,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
