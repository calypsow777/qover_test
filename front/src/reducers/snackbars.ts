import produce from 'immer';

import { Snackbar } from '../common/Snackbar';

interface ActionParam {
  type: string,
  snackbar?: Snackbar,
}

interface State {
  queue: Snackbar[],
}

export function snackbars(state: State = {
  queue: [],
}, action: ActionParam) {
  switch (action.type) {
    case 'ADD_SNACKBAR_TO_QUEUE': {
      return produce(state, (draft) => {
        // we don't have to wait for the current one to finish (e.g. a temporary "Waiting...")
        if (draft.queue[0]?.canBeDumped) {
          draft.queue[0].duration = 0;

        // if the current Snackbar isn't one that closes automatically,
        // we close it in 1s so that it doesn't block the queue
        } else if (draft.queue[0] && !draft.queue[0].duration) {
          draft.queue[0].duration = 1000;
        }

        draft.queue.push(action.snackbar!);
      });
    }

    case 'EMPTY_SNACKBARS_QUEUE': {
      return produce(state, (draft) => {
        draft.queue = [];
      });
    }

    case 'UPDATE_HEAD_OF_QUEUE': {
      return produce(state, (draft) => {
        if (draft.queue[0]) {
          draft.queue[0] = {
            ...draft.queue[0],
            ...action.snackbar,
          };
        }
      });
    }

    case 'REMOVE_HEAD_OF_QUEUE': {
      return produce(state, (draft) => {
        draft.queue = draft.queue.slice(1);
      });
    }

    default:
      return state;
  }
}
