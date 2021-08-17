import { ValidationError } from 'class-validator';
import { CustomError } from './errors/CustomError';
import { CustomHttpException } from './errors/CustomHttpException';

export function roundToTwoDecimalPlaces(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function throwExceptionFromValidationErrors(errors: ValidationError[]) {
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
