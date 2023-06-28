import { NotFoundException } from '@nestjs/common';

export class UnauthorizedException extends NotFoundException {
  constructor() {
    super(`Not authorized`);
  }
}
