import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { loginDtoMock } from './__mocks__/auth.mocks';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: PrismaService,
          useValue: () => {},
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return the login result', async () => {
      const expectedLoginResult = {
        access_token: 'threeve',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(expectedLoginResult);

      const result = await authController.login(loginDtoMock);

      expect(result).toEqual(expectedLoginResult);
      expect(authService.login).toHaveBeenCalledWith(loginDtoMock.email, loginDtoMock.password);
    });
  });
});
