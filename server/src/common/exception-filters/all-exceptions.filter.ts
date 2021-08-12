import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      // Unexpected error, we should log it to a bug tracking app like Sentry.
    }
    super.catch(exception, host);
  }
}
