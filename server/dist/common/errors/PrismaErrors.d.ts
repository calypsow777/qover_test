import { Prisma } from '@prisma/client';
export declare class CustomPrismaClientKnownRequestError {
    code: string;
    meta?: {
        target?: string[];
    };
    message: string;
    constructor(error: Prisma.PrismaClientKnownRequestError);
}
