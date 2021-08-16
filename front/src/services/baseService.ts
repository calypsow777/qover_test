import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface RequestParams {
  url: string,
  method?: string,
  body?: object,
}

export async function request({ url, method = 'GET', body }: RequestParams) {
  const { serverURL } = store.getState().global;
  const { accessToken } = store.getState().auth;

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  };

  try {
    const response = await fetch(`${serverURL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      store.dispatch({
        type: 'TOKEN_NOT_VERIFIED',
      });
      throw new CustomHttpError({ status: 401, tokenHasExpired: true });
    }

    if (response.status >= 400) {
      try {
        const data = await response.json();
        throw new CustomHttpError({ status: response.status, customErrors: data.customErrors });
      } catch (error) {
        if (error.name !== 'CustomHttpError') throw new CustomHttpError({ status: response.status });
        else throw error;
      }
    }

    try {
      const data = await response.json();
      return data;

      // response doesn't have any data
    } catch (error) {
      return null;
    }

    // the fetch failed; cannot reach the server
  } catch (error) {
    if (error.name !== 'CustomHttpError') throw new CustomHttpError({ status: 503, couldReachServer: false });
    else throw error;
  }
}
