import { request } from './baseService';
import { GetPricesResponse } from '../common/prices';

export interface GetPricesParams {
  driverAge: number,
  carMake: string,
  purchasePrice: number,
}

export function getPrices({ driverAge, carMake, purchasePrice } : GetPricesParams) : Promise<GetPricesResponse> {
  const url = `prices/${driverAge}/${carMake}/${purchasePrice}`;

  return request({ url });
}

export function getCarMakes() : Promise<string[]> {
  return request({ url: 'prices/carMakes' });
}
