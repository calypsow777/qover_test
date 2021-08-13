import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './CustomError';

export class CustomHttpException extends HttpException {
  constructor(
    statusCode: HttpStatus,
    message: string,
    customErrors: CustomError[],
  ) {
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
