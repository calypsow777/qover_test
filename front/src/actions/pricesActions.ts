import * as service from '../services/pricesService';
import { ActionCallbacks } from './interfaces';
import store from '../store';
import { CustomHttpError } from '../common/CustomHttpError';

interface GetPricesParams {
  fields: service.GetPricesParams,
  callbacks?: ActionCallbacks,
}

interface GetCarMakesParams {
  callbacks?: ActionCallbacks,
}

export async function getPrices({ fields, callbacks }: GetPricesParams) {
  try {
    const prices = await service.getPrices(fields);

    store.dispatch({
      type: 'PRICES_FETCHED',
      prices,
    });

    callbacks?.onSuccess?.('Prices successfully fetched.');
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to fetch the prices.';
    callbacks?.onError?.(e);
  } finally {
    callbacks?.onFinish?.();
  }
}

export async function getCarMakes({ callbacks } : GetCarMakesParams) {
  try {
    const carMakes = await service.getCarMakes();

    store.dispatch({
      type: 'CAR_MAKES_FETCHED',
      carMakes,
    });

    callbacks?.onSuccess?.('Car makes successfully fetched.');
  } catch (error) {
    const e = <CustomHttpError>error;
    e.defaultMsg = 'Error while trying to fetch the car makes.';
    callbacks?.onError?.(e);
  } finally {
    callbacks?.onFinish?.();
  }
}
