import produce from 'immer';

interface ActionParam {
  type: string,
  accessToken?: string,
}

interface State {
  accessToken: undefined | string;
}

export function auth(state: State = {
  accessToken: localStorage.getItem('accessToken') || undefined,
}, action: ActionParam) {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      localStorage.setItem('accessToken', action.accessToken!);
      return produce(state, (draft) => {
        draft.accessToken = action.accessToken;
      });
    }

    case 'USER_LOGGED_OUT': {
      localStorage.removeItem('accessToken');
      return produce(state, (draft) => {
        draft.accessToken = undefined;
      });
    }

    case 'TOKEN_NOT_VERIFIED': {
      localStorage.removeItem('accessToken');
      return produce(state, (draft) => {
        draft.accessToken = undefined;
      });
    }

    default:
      return state;
  }
}
