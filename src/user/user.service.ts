import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundException } from './user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getUserById(id: number) {
    const post = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new UserNotFoundException();
    }

    return post;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
