import { IsString, IsEmail, IsOptional } from 'class-validator';

import { CustomError } from 'src/common/errors/CustomError';

export class SignupUserDto {
  @IsEmail(
    {},
    {
      context: {
        customError: new CustomError('users-1', 'The email must be valid.'),
      },
    },
  )
  email: string;

  @IsString({
    context: {
      customError: new CustomError('users-2', 'The password must be a string.'),
    },
  })
  password: string;
}

export class UserWithoutPwdDto {
  id: number;
  email: string;
}

export class LoginUserDto {
  @IsEmail(
    {},
    {
      context: {
        customError: new CustomError('users-4', 'The email must be valid.'),
      },
    },
  )
  email: string;

  @IsString({
    context: {
      customError: new CustomError('users-5', 'The password must be a string.'),
    },
  })
  password: string;

  @IsOptional()
  rememberMe: boolean;
}
