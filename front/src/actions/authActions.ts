import * as service from '../services/authService';
import { ActionCallbacks } from './interfaces';
import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface LoginParams {
  fields: service.LoginParams,
  callbacks?: ActionCallbacks,
}

interface LogoutParams {
  callbacks?: ActionCallbacks,
}

interface VerifyParams {
  callbacks?: ActionCallbacks,
}

export async function login({ fields, callbacks }: LoginParams) {
  try {
    const { user, accessToken } = await service.login(fields);

    store.dispatch({
      type: 'USER_LOGGED_IN',
      user,
      accessToken,
    });

    callbacks?.onSuccess?.('You successfully logged in.');
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to log you in.';
    callbacks?.onError?.(e);
  } finally {
    callbacks?.onFinish?.();
  }
}

export async function logout({ callbacks }: LogoutParams = {}) {
  store.dispatch({
    type: 'USER_LOGGED_OUT',
  });

  callbacks?.onSuccess?.('You successfully logged out.');
}

export async function verify({ callbacks }: VerifyParams) {
  try {
    const user = await service.verify();

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
  } finally {
    callbacks?.onFinish?.();
  }
}
