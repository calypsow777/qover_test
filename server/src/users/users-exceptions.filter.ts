import { Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomError } from 'src/common/errors/CustomError';
import { CustomHttpException } from 'src/common/errors/CustomHttpException';
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
          return super.catch(
            new CustomHttpException({
              customErrors: [
                new CustomError(
                  'users-3',
                  'The email is already present in the database.',
                ),
              ],
            }),
            host,
          );
        }
      }
    }
    super.catch(e, host);
  }
}
