import { Price } from '.prisma/client';
interface GetPricesDtoConstructorParams {
    driverAge: number;
    carMake: string;
    purchasePrice: number;
}
export declare class GetPricesDto {
    driverAge: number;
    carMake: string;
    purchasePrice: number;
    constructor({ driverAge, carMake, purchasePrice, }: GetPricesDtoConstructorParams);
}
export interface GetPricesResponseDto {
    global: {
        yearlyPrice: number;
    };
    universal: {
        yearlyPrice: number;
    };
}
export interface GetPricesParams {
    driverAge: number;
    carMake: string;
    purchasePrice: number;
    price: Price;
}
export {};
