import produce from 'immer';

interface ActionParam {
  type: string,
  screen?: string,
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
    case 'USER_LOGGED_IN': {
      return produce(state, (draft) => {
        draft.currentScreen = 'carForm';
      });
    }

    case 'USER_LOGGED_OUT': {
      localStorage.removeItem('accessToken');
      return produce(state, (draft) => {
        draft.currentScreen = 'login';
      });
    }

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

    case 'CHANGE_CURRENT_SCREEN': {
      return produce(state, (draft) => {
        draft.currentScreen = action.screen!;
      });
    }

    default:
      return state;
  }
}
