import { NextFunction, Request, Response } from 'express';

/*
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log('Requested');
    next();
  }
}
*/

export function logger(_: Request, __: Response, next: NextFunction) {
  console.log('Requested');
  next();
}
