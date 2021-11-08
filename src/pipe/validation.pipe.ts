import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const error = await validate(object);
    if (error.length > 0) {
      throw new BadRequestException('Validation Error');
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Number, Array, Boolean, Object];
    return types.includes(metatype);
  }
}
