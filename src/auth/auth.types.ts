import { User } from '../user/entity/user.entity';

export interface IJwtAccessTokenFields {
  id: number;
  email: string;
}

export interface IJwtResponse {
  access_token: string;
  /**
   * This will be required in the future
   */
  permissions?: [];
}

export interface RequestWithUser extends Request {
  user: User;
}
