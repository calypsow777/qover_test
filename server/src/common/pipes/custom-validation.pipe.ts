import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { throwExceptionFromValidationErrors } from '../../common/utils';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { stopAtFirstError: true });

    if (errors.length > 0) throwExceptionFromValidationErrors(errors);

    return value;
  }

  private toValidate(metatype: Function): boolean { // eslint-disable-line
    const types: Function[] = [String, Boolean, Number, Array, Object]; // eslint-disable-line
    return !types.includes(metatype);
  }
}
