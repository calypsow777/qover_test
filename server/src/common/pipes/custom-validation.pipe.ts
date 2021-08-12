import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomError } from '../errors/CustomError';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const resErrors: CustomError[] = [];
      for (const error of errors) {
        const contexts = error.contexts;
        for (const contextKey in contexts) {
          resErrors.push(contexts[contextKey].customError);
        }
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'The validation failed.',
          customErrors: resErrors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
