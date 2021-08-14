import produce from 'immer';

interface ActionParam {
  type: string,
}

interface State {
  serverURL: string,
  currentScreen: string,
}

export function global(state: State = {
  serverURL: 'http://localhost:4700/',
  currentScreen: '',
}, action: ActionParam) {
  switch (action.type) {
    case 'TOKEN_VERIFIED': {
      return produce(state, (draft) => {
        draft.currentScreen = 'carForm';
      });
    }

    case 'TOKEN_NOT_VERIFIED': {
      return produce(state, (draft) => {
        draft.currentScreen = 'login';
      });
    }

    default:
      return state;
  }
}
