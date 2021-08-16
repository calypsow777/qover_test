import produce from 'immer';
import { GetPricesResponse } from '../common/prices';

interface ActionParam {
  type: string,
  carMakes?: string[],
  prices?: GetPricesResponse,
}

interface State {
  carMakes: string[],
  prices: GetPricesResponse | undefined,
}

export function prices(state: State = {
  carMakes: [],
  prices: undefined,
}, action: ActionParam) {
  switch (action.type) {
    case 'CAR_MAKES_FETCHED': {
      return produce(state, (draft) => {
        draft.carMakes = [...action.carMakes!];
      });
    }

    case 'PRICES_FETCHED': {
      return produce(state, (draft) => {
        draft.prices = { ...action.prices! };
      });
    }

    default:
      return state;
  }
}
