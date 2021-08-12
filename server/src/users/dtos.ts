import { IsString, IsEmail } from 'class-validator';

import { CustomError } from 'src/common/errors/CustomError';

export class signupUserDto {
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

export class userWithoutPwdDto {
  id: number;
  email: string;
}
