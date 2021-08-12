import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomError } from 'src/common/errors/CustomError';
import { CustomPrismaClientKnownRequestError } from 'src/common/errors/PrismaErrors';
import { AllExceptionsFilter } from 'src/common/exception-filters/all-exceptions.filter';

@Catch()
export class UsersExceptionsFilter extends AllExceptionsFilter {
  catch(e: unknown, host: ArgumentsHost) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint failed
      if (e.code === 'P2002') {
        const customE = new CustomPrismaClientKnownRequestError(e);
        // email is already taken
        if (customE.meta?.target?.includes('email')) {
          super.catch(
            new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'The validation failed.',
                customErrors: [
                  new CustomError(
                    'users-3',
                    'The email is already present in the database.',
                  ),
                ],
              },
              HttpStatus.BAD_REQUEST,
            ),
            host,
          );
          return;
        }
      }
    }
    super.catch(e, host);
  }
}
