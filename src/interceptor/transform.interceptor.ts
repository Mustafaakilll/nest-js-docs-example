import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
// @ts-ignore
import { Response } from 'express';

export interface Response<T> extends Response {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // @ts-ignore
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        data: data,
        status: context.switchToHttp().getResponse<Response>().statusCode,
      })),
    );
  }
}
