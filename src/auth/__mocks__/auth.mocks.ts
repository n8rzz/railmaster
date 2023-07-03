import { LoginDto } from '../dto/login.dto';
import { RequestWithUser } from '../auth.types';

export const loginDtoMock: LoginDto = {
  email: 'wes.anderson@movies.com',
  password: 'centerTheFrame',
};

export const requestWithUserMock = {
  user: {
    email: 'bab@example.com',
    id: 1,
  },
} as RequestWithUser;
