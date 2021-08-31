import * as service from '../services/authService';
import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface LoginParams {
  fields: service.LoginParams,
}

export async function login({ fields }: LoginParams): Promise<string> {
  try {
    const { user, accessToken } = await service.login(fields);

    store.dispatch({
      type: 'USER_LOGGED_IN',
      user,
      accessToken,
    });

    return 'You successfully logged in.';
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to log you in.';
    throw e;
  }
}

export async function logout(): Promise<string> {
  store.dispatch({
    type: 'USER_LOGGED_OUT',
  });

  return 'You successfully logged out.';
}

export async function verify(): Promise<string> {
  try {
    const user = await service.verify();

    store.dispatch({
      type: 'TOKEN_VERIFIED',
      user,
    });

    return 'Access token successfully verified.';
  } catch (error) {
    store.dispatch({
      type: 'TOKEN_NOT_VERIFIED',
    });

    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to verify the access token.';
    throw e;
  }
}
