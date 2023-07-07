import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundException } from './user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
