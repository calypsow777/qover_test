import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomError } from '../errors/CustomError';
import { CustomHttpException } from '../errors/CustomHttpException';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { stopAtFirstError: true });

    if (errors.length > 0) {
      const resErrors: CustomError[] = [];
      for (const error of errors) {
        const contexts = error.contexts;
        for (const contextKey in contexts) {
          resErrors.push(contexts[contextKey].customError);
        }
      }
      throw new CustomHttpException({
        customErrors: resErrors,
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean { // eslint-disable-line
    const types: Function[] = [String, Boolean, Number, Array, Object]; // eslint-disable-line
    return !types.includes(metatype);
  }
}
