import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/domain/auth/jwt-auth.guard';
import { AuthGuardMock } from '../src/domain/auth/__mocks__/auth.guard.mock';
import { CreateRailcarDto } from '../src/domain/railcars/dto/create-railcar.dto';
import { RailcarDto } from '../src/domain/railcars/dto/railcar.dto';
import { RailcarsService } from '../src/domain/railcars/railcars.service';
import { railcarMock } from '../src/domain/railcars/__mocks__/railcar.mocks';

describe('RailcarsController (e2e)', () => {
  const currentDate = new Date();
  const createRailcarDto: CreateRailcarDto = {
    capacity_unit: 'gal',
    capacity_value: 10000,
    trainId: undefined,
    type: 'tank',
    userId: 1,
  };
  const expectedRailcar: RailcarDto = {
    ...createRailcarDto,
    id: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  let app: INestApplication;
  let railcarsService: RailcarsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    railcarsService = moduleFixture.get<RailcarsService>(RailcarsService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /railcars', () => {
    it('should create a game', async () => {
      jest.spyOn(railcarsService, 'create').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .post('/railcars')
        .send(createRailcarDto)
        .expect(HttpStatus.CREATED);

      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(railcarsService.create).toHaveBeenCalled();
    });
  });

  describe('GET /railcars', () => {
    it('should return an array of games', async () => {
      const expectedRailcars = [
        railcarMock,
        {
          ...railcarMock,
          id: 2,
        },
      ];

      jest.spyOn(railcarsService, 'findAll').mockResolvedValue(expectedRailcars as never);

      const response = await request(app.getHttpServer()).get('/railcars').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedRailcars.length);
      expect(railcarsService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /railcars/:id', () => {
    it('should return a game by id', async () => {
      const railcarId = '1';

      jest.spyOn(railcarsService, 'findOne').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .get(`/railcars/${railcarId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expectedRailcar.id);
      expect(railcarsService.findOne).toHaveBeenCalledWith(+railcarId);
    });
  });

  describe('PATCH /railcars/:id', () => {
    it('should update a game by id', async () => {
      const railcarId = 1;
      const updateRailcarDto: RailcarDto = {
        ...railcarMock,
        capacity_unit: 'L',
      };
      const expectedRailcar = {
        ...updateRailcarDto,
        capacity_unit: updateRailcarDto.capacity_unit,
      };

      jest.spyOn(railcarsService, 'update').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .patch(`/railcars/${railcarId}`)
        .send(updateRailcarDto)
        .expect(HttpStatus.OK);

      expect(response.body.capacity_unit).toEqual(expectedRailcar.capacity_unit);
      expect(railcarsService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /railcars/:id', () => {
    it('should delete a game by id', async () => {
      const railcarId = '1';

      jest.spyOn(railcarsService, 'remove').mockResolvedValue(railcarMock as never);

      const response = await request(app.getHttpServer())
        .delete(`/railcars/${railcarId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(response.status).toEqual(204);
      expect(railcarsService.remove).toHaveBeenCalledWith(+railcarId);
    });
  });
});
