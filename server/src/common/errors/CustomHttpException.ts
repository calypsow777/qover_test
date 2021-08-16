import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './CustomError';

interface ConstructorParams {
  statusCode?: HttpStatus;
  message?: string;
  customErrors: CustomError[];
}
export class CustomHttpException extends HttpException {
  constructor({
    statusCode = HttpStatus.BAD_REQUEST,
    message = 'The validation failed',
    customErrors,
  }: ConstructorParams) {
    super(
      {
        statusCode,
        message,
        customErrors,
      },
      statusCode,
    );
  }
}
