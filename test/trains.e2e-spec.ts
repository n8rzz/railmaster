import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/domain/auth/jwt-auth.guard';
import { AuthGuardMock } from '../src/domain/auth/__mocks__/auth.guard.mock';
import { TrainDto } from '../src/domain/trains/dto/train.dto';
import { TrainsService } from '../src/domain/trains/trains.service';
import {
  createTrainDtoMock,
  trainDtoMock,
  updateRailcarsMock,
  updateRailcarsResponseMock,
} from '../src/domain/trains/__mocks__/trains.mocks';

describe('TrainsController (e2e)', () => {
  const currentDate = new Date();
  const expectedRailcar: TrainDto = {
    ...createTrainDtoMock,
    id: 1,
    engines: [],
    railcars: [],
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  let app: INestApplication;
  let trainsService: TrainsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    trainsService = moduleFixture.get<TrainsService>(TrainsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /trains', () => {
    it('should create a Train', async () => {
      jest.spyOn(trainsService, 'create').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .post('/trains')
        .send(createTrainDtoMock)
        .expect(HttpStatus.CREATED);

      expect(response.body.id).toBeDefined();
      expect(response.body.engines).toBeDefined();
      expect(response.body.railcars).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(trainsService.create).toHaveBeenCalled();
    });
  });

  describe('GET /trains', () => {
    it('should return an array of Trains', async () => {
      const expectedTrains = [
        trainDtoMock,
        {
          ...trainDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(trainsService, 'findAll').mockResolvedValue(expectedTrains as never);

      const response = await request(app.getHttpServer()).get('/trains').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedTrains.length);
      expect(trainsService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /trains/:id', () => {
    it('should return a Train by id', async () => {
      const trainId = '1';

      jest.spyOn(trainsService, 'findOne').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .get(`/trains/${trainId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expectedRailcar.id);
      expect(trainsService.findOne).toHaveBeenCalledWith(+trainId);
    });
  });

  describe('PATCH /trains/:id', () => {
    it('should update a Train by id', async () => {
      const trainId = 1;
      const updateTrainDto: TrainDto = {
        ...trainDtoMock,
        maxSpeed: 100,
      };
      const expectedRailcar = {
        ...updateTrainDto,
        maxSpeed: updateTrainDto.maxSpeed,
      };

      jest.spyOn(trainsService, 'update').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .patch(`/trains/${trainId}`)
        .send(updateTrainDto)
        .expect(HttpStatus.OK);

      expect(response.body.maxSpeed).toEqual(expectedRailcar.maxSpeed);
      expect(trainsService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /trains/:id', () => {
    it('should delete a Train by id', async () => {
      const trainId = '1';

      jest.spyOn(trainsService, 'remove').mockResolvedValue(trainDtoMock as never);

      const response = await request(app.getHttpServer())
        .delete(`/trains/${trainId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(response.status).toEqual(204);
      expect(trainsService.remove).toHaveBeenCalledWith(+trainId);
    });
  });

  describe('POST /trains/:id/railcars', () => {
    it('should add railcar associations to Train', async () => {
      const trainId = '1';

      jest
        .spyOn(trainsService, 'addRailcars')
        .mockResolvedValue(updateRailcarsResponseMock as never);

      const response = await request(app.getHttpServer())
        .post(`/trains/${trainId}/railcars`)
        .send(updateRailcarsMock)
        .expect(HttpStatus.CREATED);

      expect(response.body.railcars).toEqual(updateRailcarsResponseMock.railcars);
      expect(response.status).toEqual(201);
      expect(trainsService.addRailcars).toHaveBeenCalledWith(
        +trainId,
        updateRailcarsMock.railcarIds,
      );
    });
  });
});
