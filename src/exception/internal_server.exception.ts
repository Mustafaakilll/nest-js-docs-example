import { HttpException } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message ?? 'Internal Server Error', status ?? 500);
  }
}
