import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ToDeletePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
