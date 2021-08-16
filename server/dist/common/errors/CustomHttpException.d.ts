import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from './CustomError';
interface ConstructorParams {
    statusCode?: HttpStatus;
    message?: string;
    customErrors: CustomError[];
}
export declare class CustomHttpException extends HttpException {
    constructor({ statusCode, message, customErrors, }: ConstructorParams);
}
export {};
