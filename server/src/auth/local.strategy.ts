import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomHttpException } from 'src/common/errors/CustomHttpException';
import { CustomError } from 'src/common/errors/CustomError';
import { LoginDto } from './dtos';
import { throwExceptionFromValidationErrors } from 'src/common/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginDto = new LoginDto();
    loginDto.email = email;
    loginDto.password = password;

    const errors = await validate(loginDto, {
      stopAtFirstError: true,
    });

    if (errors.length > 0) throwExceptionFromValidationErrors(errors);

    const { user, pwdIsWrong } = await this.authService.validateUser(
      email.toLowerCase(),
      password,
    );

    if (!user) {
      throw new CustomHttpException({
        customErrors: [
          new CustomError('auth-3', 'This email is not registered yet.'),
        ],
      });
    }

    if (pwdIsWrong) {
      throw new CustomHttpException({
        customErrors: [new CustomError('auth-4', 'The password is incorrect.')],
      });
    }

    return user;
  }
}
