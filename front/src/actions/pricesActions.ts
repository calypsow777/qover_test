import * as service from '../services/pricesService';
import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface GetPricesParams {
  fields: service.GetPricesParams,
}

export async function getPrices({ fields }: GetPricesParams): Promise<string> {
  try {
    const prices = await service.getPrices(fields);

    store.dispatch({
      type: 'PRICES_FETCHED',
      prices,
    });

    return 'Prices successfully fetched.';
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to fetch the prices.';
    throw e;
  }
}

export async function getCarMakes(): Promise<string> {
  try {
    const carMakes = await service.getCarMakes();

    store.dispatch({
      type: 'CAR_MAKES_FETCHED',
      carMakes,
    });

    return 'Car makes successfully fetched.';
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to fetch the car makes.';
    throw e;
  }
}
