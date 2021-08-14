import {
  login as loginService,
  verify as verifyService,
  LoginParams as LoginServiceParams,
} from '../services/authService';
import { ActionCallbacks } from './interfaces';
import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface LoginParams {
  fields: LoginServiceParams,
  callbacks?: ActionCallbacks,
}

interface VerifyParams {
  callbacks?: ActionCallbacks,
}

export async function login({ fields, callbacks }: LoginParams) {
  try {
    const { user, accessToken } = await loginService(fields);

    store.dispatch({
      type: 'USER_LOGGED_IN',
      user,
      accessToken,
    });

    callbacks?.onSuccess?.('User successfully logged in.');
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to log in the user.';
    callbacks?.onError?.(e);
  }
}

export async function verify({ callbacks }: VerifyParams) {
  try {
    const user = await verifyService();

    store.dispatch({
      type: 'TOKEN_VERIFIED',
      user,
    });

    callbacks?.onSuccess?.('Access token successfully verified.');
  } catch (error) {
    store.dispatch({
      type: 'TOKEN_NOT_VERIFIED',
    });

    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to verify the access token.';
    callbacks?.onError?.(e);
  }
}
