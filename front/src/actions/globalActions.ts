import store from '../store';

export function changeCurrentScreen(screen: string) {
  store.dispatch({
    type: 'CHANGE_CURRENT_SCREEN',
    screen,
  });
}
