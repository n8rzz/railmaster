import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/domain/auth/jwt-auth.guard';
import { AuthGuardMock } from '../src/domain/auth/__mocks__/auth.guard.mock';
import { EngineDto } from '../src/domain/engines/dto/engine.dto';
import { createEngineDtoMock, engineDtoMock } from '../src/domain/engines/__mocks__/engine.mocks';
import { EnginesService } from '../src/domain/engines/engines.service';

describe('EnginesController (e2e)', () => {
  const currentDate = new Date();
  const expectedRailcar: EngineDto = {
    ...createEngineDtoMock,
    id: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  let app: INestApplication;
  let enginesService: EnginesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(AuthGuardMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    enginesService = moduleFixture.get<EnginesService>(EnginesService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /engines', () => {
    it('should create a Engine', async () => {
      jest.spyOn(enginesService, 'create').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .post('/engines')
        .send(createEngineDtoMock)
        .expect(HttpStatus.CREATED);

      expect(response.body.id).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
      expect(enginesService.create).toHaveBeenCalled();
    });
  });

  describe('GET /engines', () => {
    it('should return an array of Engines', async () => {
      const expectedEngines = [
        createEngineDtoMock,
        {
          ...createEngineDtoMock,
          id: 2,
        },
      ];

      jest.spyOn(enginesService, 'findAll').mockResolvedValue(expectedEngines as never);

      const response = await request(app.getHttpServer()).get('/engines').expect(HttpStatus.OK);

      expect(response.body.length).toEqual(expectedEngines.length);
      expect(enginesService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /engines/:id', () => {
    it('should return a Engine by id', async () => {
      const engineId = '1';

      jest.spyOn(enginesService, 'findOne').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .get(`/engines/${engineId}`)
        .expect(HttpStatus.OK);

      expect(response.body.id).toEqual(expectedRailcar.id);
      expect(enginesService.findOne).toHaveBeenCalledWith(+engineId);
    });
  });

  describe('PATCH /engines/:id', () => {
    it('should update a Engine by id', async () => {
      const engineId = 1;
      const updateEngineDto: EngineDto = {
        ...engineDtoMock,
        fuelEfficiency: 50,
      };
      const expectedRailcar = {
        ...updateEngineDto,
        fuelEfficiency: updateEngineDto.fuelEfficiency,
      };

      jest.spyOn(enginesService, 'update').mockResolvedValue(expectedRailcar as never);

      const response = await request(app.getHttpServer())
        .patch(`/engines/${engineId}`)
        .send(updateEngineDto)
        .expect(HttpStatus.OK);

      expect(response.body.fuelEfficiency).toEqual(expectedRailcar.fuelEfficiency);
      expect(enginesService.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /engines/:id', () => {
    it('should delete a Engine by id', async () => {
      const engineId = '1';

      jest.spyOn(enginesService, 'remove').mockResolvedValue(engineDtoMock as never);

      const response = await request(app.getHttpServer())
        .delete(`/engines/${engineId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.body).toEqual({});
      expect(response.status).toEqual(204);
      expect(enginesService.remove).toHaveBeenCalledWith(+engineId);
    });
  });
});
