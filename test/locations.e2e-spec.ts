import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/domain/auth/jwt-auth.guard';
import { AuthGuardMock } from '../src/domain/auth/__mocks__/auth.guard.mock';
import { LocationDto } from '../src/domain/locations/dto/location.dto';
import { LocationsService } from '../src/domain/locations/locations.service';
import {
  createLocationDtoMock,
  locationDtoMock,
} from '../src/domain/locations/__mocks__/location.mocks';
import { faker } from '@faker-js/faker';

describe('LocationsController (e2e)', () => {
  let app: INestApplication;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    locationsService = moduleFixture.get<LocationsService>(LocationsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /locations', () => {
    it('should create a Location', async () => {
      jest.spyOn(locationsService, 'create').mockResolvedValue(locationDtoMock as never);

      const response = await request(app.getHttpServer())
        .post('/locations')
        .send(createLocationDtoMock)
        .expect(HttpStatus.CREATED);

      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(locationsService.create).toHaveBeenCalled();
    });
  });

  describe('GET /locations', () => {
    it('should return an array of Locations', async () => {
      const expectedLocations = [
        locationDtoMock,
        {
          ...locationDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(locationsService, 'findAll').mockResolvedValue(expectedLocations as never);

      const response = await request(app.getHttpServer()).get('/locations').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedLocations.length);
      expect(locationsService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /locations/:id', () => {
    it('should return a Location by id', async () => {
      const locationId = '1';

      jest.spyOn(locationsService, 'findOne').mockResolvedValue(locationDtoMock as never);

      const response = await request(app.getHttpServer())
        .get(`/locations/${locationId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(locationDtoMock.id);
      expect(locationsService.findOne).toHaveBeenCalledWith(+locationId);
    });
  });

  describe('PATCH /locations/:id', () => {
    it('should update a Location by id', async () => {
      const locationId = 1;
      const updatedName = faker.location.city();
      const updateLocationDto: LocationDto = {
        ...locationDtoMock,
        name: updatedName,
      };
      const expectedLocation = {
        ...updateLocationDto,
        name: updatedName,
      };

      jest.spyOn(locationsService, 'update').mockResolvedValue(expectedLocation as never);

      const response = await request(app.getHttpServer())
        .patch(`/locations/${locationId}`)
        .send(updateLocationDto)
        .expect(HttpStatus.OK);

      expect(response.body.name).toEqual(expectedLocation.name);
      expect(locationsService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /locations/:id', () => {
    it('should delete a Location by id', async () => {
      const locationId = '1';

      jest.spyOn(locationsService, 'remove').mockResolvedValue(locationDtoMock as never);

      const response = await request(app.getHttpServer())
        .delete(`/locations/${locationId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(response.status).toEqual(204);
      expect(locationsService.remove).toHaveBeenCalledWith(+locationId);
    });
  });
});
