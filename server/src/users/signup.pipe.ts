import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class SignupPipe implements PipeTransform {
  async transform(value: any) {
    return {
      ...value,
      email: value.email.toLowerCase(),
    };
  }
}
