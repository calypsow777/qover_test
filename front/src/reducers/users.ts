import produce from 'immer';
import { User } from '../common/users';

interface ActionParam {
  type: string,
  user?: User,
}

interface State {
  user: undefined | User;
}

export function users(state: State = {
  user: undefined,
}, action: ActionParam) {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      return produce(state, (draft) => {
        draft.user = action.user;
      });
    }

    case 'USER_LOGGED_OUT': {
      return produce(state, (draft) => {
        draft.user = undefined;
      });
    }

    case 'TOKEN_VERIFIED': {
      return produce(state, (draft) => {
        draft.user = action.user;
      });
    }

    case 'TOKEN_NOT_VERIFIED': {
      return produce(state, (draft) => {
        draft.user = undefined;
      });
    }

    default:
      return state;
  }
}
