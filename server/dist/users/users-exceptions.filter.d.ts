import { ArgumentsHost } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/common/exception-filters/all-exceptions.filter';
export declare class UsersExceptionsFilter extends AllExceptionsFilter {
    catch(e: unknown, host: ArgumentsHost): void;
}
