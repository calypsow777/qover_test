import store from '../store';

export async function changeCurrentScreen(screen: string) {
  store.dispatch({
    type: 'CHANGE_CURRENT_SCREEN',
    screen,
  });
}
