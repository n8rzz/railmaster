import { CreateLocationDto } from '../dto/create-location.dto';
import { faker } from '@faker-js/faker';
import { LocationDto } from '../dto/location.dto';

const now = new Date();

export const createLocationDtoMock: CreateLocationDto = {
  name: faker.location.city(),
};

export const locationDtoMock: LocationDto = {
  ...createLocationDtoMock,
  id: 1,
  createdAt: now,
  updatedAt: now,
};
