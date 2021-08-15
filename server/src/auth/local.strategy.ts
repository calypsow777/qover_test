import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomHttpException } from 'src/common/errors/CustomHttpException';
import { CustomError } from 'src/common/errors/CustomError';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const { user, pwdIsWrong } = await this.authService.validateUser(
      email,
      password,
    );

    if (!user) {
      throw new CustomHttpException(
        HttpStatus.UNAUTHORIZED,
        'The validation failed.',
        [new CustomError('auth-3', 'This email is not registered yet.')],
      );
    }

    if (pwdIsWrong) {
      throw new CustomHttpException(
        HttpStatus.UNAUTHORIZED,
        'The validation failed.',
        [new CustomError('auth-4', 'The password is incorrect.')],
      );
    }

    return user;
  }
}
