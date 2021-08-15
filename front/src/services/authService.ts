import { request } from './baseService';
import { LoginResponse } from '../common/auth';
import { UserWithoutPwdDto } from '../common/users';

export interface LoginParams {
  email: string,
  password: string,
  rememberMe: boolean,
}

export function login(body : LoginParams) : Promise<LoginResponse> {
  const url = 'auth/login';

  return request({ url, method: 'POST', body });
}

export function verify() : Promise<UserWithoutPwdDto> {
  const url = 'auth/verify';
  return request({ url });
}
