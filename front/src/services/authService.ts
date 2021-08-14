import { request } from './baseService';
import { LoginResponse } from '../common/auth';
import { UserWithoutPwdDto } from '../common/users';

export interface LoginParams {
  email: string,
  password: string,
}

export function login({ email, password } : LoginParams) : Promise<LoginResponse> {
  const url = 'auth/login';
  const body = {
    email,
    password,
  };

  return request({ url, method: 'POST', body });
}

export function verify() : Promise<UserWithoutPwdDto> {
  const url = 'auth/verify';
  return request({ url });
}
