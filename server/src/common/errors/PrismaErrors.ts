import { Prisma } from '@prisma/client';

export class CustomPrismaClientKnownRequestError {
  code: string;
  meta?: {
    target?: string[];
  };
  message: string;

  constructor(error: Prisma.PrismaClientKnownRequestError) {
    this.code = error.code;
    this.meta = error.meta ? { ...error.meta } : null;
    this.message = error.message;
  }
}
