import { IsString, IsOptional } from 'class-validator';

import { CustomError } from 'src/common/errors/CustomError';
import { UserWithoutPwdDto } from 'src/users/dtos';

export class LoginDto {
  // We use IsString instead of IsEmail because we were asked to provide a "Qover" login for the reviewers.
  @IsString({
    context: {
      customError: new CustomError('auth-1', 'The email must be valid.'),
    },
  })
  email: string;

  @IsString({
    context: {
      customError: new CustomError('auth-2', 'The password must be a string.'),
    },
  })
  password: string;

  @IsOptional()
  rememberMe: boolean;
}

export interface LoginResponseDto {
  accessToken: string;
  user: UserWithoutPwdDto;
}
