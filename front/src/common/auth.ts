import { UserWithoutPwdDto } from './users';

export interface LoginResponse {
  accessToken: string;
  user: UserWithoutPwdDto;
}
