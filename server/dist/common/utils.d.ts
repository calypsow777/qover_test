import { ValidationError } from 'class-validator';
export declare function roundToTwoDecimalPlaces(num: number): number;
export declare function throwExceptionFromValidationErrors(errors: ValidationError[]): void;
