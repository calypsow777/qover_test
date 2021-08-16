import { CustomHttpError } from '../common/CustomHttpError';
import { Snackbar, SnackbarOverride } from '../common/Snackbar';
import store from '../store';

export function addToQueue(snackbar: Snackbar) {
  store.dispatch({
    type: 'ADD_SNACKBAR_TO_QUEUE',
    snackbar,
  });
}

export function addWaitingForServerToQueue() {
  store.dispatch({
    type: 'ADD_SNACKBAR_TO_QUEUE',
    snackbar: new Snackbar({
      severity: 'info',
      msg: 'Waiting for server...',
      duration: null,
      canBeDumped: true,
      showClose: false,
    }),
  });
}

export function addRequestErrorToQueue(error: CustomHttpError) {
  let msg = 'Your access has expired.';
  if (!error.tokenHasExpired) {
    msg = error.frontMsg || error.defaultMsg;
  }

  store.dispatch({
    type: 'ADD_SNACKBAR_TO_QUEUE',
    snackbar: new Snackbar({
      severity: 'error',
      msg,
      duration: 5000,
      canBeDumped: false,
      showClose: true,
    }),
  });
}

export function addSuccessToQueue(msg: string) {
  store.dispatch({
    type: 'ADD_SNACKBAR_TO_QUEUE',
    snackbar: new Snackbar({
      severity: 'success',
      msg,
      duration: 3000,
      canBeDumped: false,
      showClose: false,
    }),
  });
}

export function emptyQueue() {
  store.dispatch({
    type: 'EMPTY_SNACKBARS_QUEUE',
  });
}

export function updateHeadOfQueue(snackbar: SnackbarOverride) {
  store.dispatch({
    type: 'UPDATE_HEAD_OF_QUEUE',
    snackbar,
  });
}

export function removeHeadOfQueue() {
  store.dispatch({
    type: 'REMOVE_HEAD_OF_QUEUE',
  });
}
