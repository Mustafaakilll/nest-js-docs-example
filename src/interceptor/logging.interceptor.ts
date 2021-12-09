import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before Execution any function');
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`After execution any function ${Date.now() - now}`),
        ),
      )
      .pipe(
        map((value) => {
          console.log(value);
          return value;
        }),
      );
  }
}
