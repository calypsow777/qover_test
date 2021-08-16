import {
  IsInt,
  IsPositive,
  Min,
  Max,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { CustomError } from 'src/common/errors/CustomError';
import { Price } from '.prisma/client';

interface GetPricesDtoConstructorParams {
  driverAge: number;
  carMake: string;
  purchasePrice: number;
}

export class GetPricesDto {
  @Max(120, {
    context: {
      customError: new CustomError('prices-4', 'Sorry! The driver is too old.'),
    },
  })
  @Min(18, {
    context: {
      customError: new CustomError(
        'prices-3',
        'Sorry! The driver is too young.',
      ),
    },
  })
  @IsPositive({
    context: {
      customError: new CustomError('prices-2', 'Please enter a valid age.'),
    },
  })
  @IsInt({
    context: {
      customError: new CustomError('prices-1', 'Please enter a valid age.'),
    },
  })
  driverAge: number;

  @IsNotEmpty({
    context: {
      customError: new CustomError('prices-5', 'Please select a car make.'),
    },
  })
  carMake: string;

  @Min(5000, {
    context: {
      customError: new CustomError(
        'prices-8',
        'Sorry! The price of the car is too low.',
      ),
    },
  })
  @IsPositive({
    context: {
      customError: new CustomError(
        'prices-7',
        'Please enter a valid purchase price.',
      ),
    },
  })
  @IsNumber(
    {},
    {
      context: {
        customError: new CustomError(
          'prices-6',
          'Please enter a valid purchase price.',
        ),
      },
    },
  )
  purchasePrice: number;

  constructor({
    driverAge,
    carMake,
    purchasePrice,
  }: GetPricesDtoConstructorParams) {
    this.driverAge = driverAge;
    this.carMake = carMake;
    this.purchasePrice = purchasePrice;
  }
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
