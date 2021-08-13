import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './CustomError';
export declare class CustomHttpException extends HttpException {
    constructor(statusCode: HttpStatus, message: string, customErrors: CustomError[]);
}
