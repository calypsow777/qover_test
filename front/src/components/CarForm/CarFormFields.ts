import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
  IsNumber,
} from 'class-validator';

interface ConstructorParams {
  driverAge: number,
  carMake: string,
  purchasePrice: number,
}

export class CarFormFields {
  @Max(120, {
    message: 'Sorry! The driver is too old.',
  })
  @Min(18, {
    message: 'Sorry! The driver is too young.',
  })
  @IsPositive({
    message: 'Please enter a valid age.',
  })
  @IsInt({
    message: 'Please enter a valid age.',
  })
  driverAge: number;

  @IsNotEmpty({
    message: 'Please select a car make.',
  })
  carMake: string;

  @Min(5000, {
    message: 'Sorry! The price of the car is too low.',
  })
  @IsPositive({
    message: 'Please enter a valid purchase price.',
  })
  @IsNumber({}, {
    message: 'Please enter a valid purchase price.',
  })
  purchasePrice: number;

  constructor({ driverAge, carMake, purchasePrice }: ConstructorParams) {
    this.driverAge = driverAge;
    this.carMake = carMake;
    this.purchasePrice = purchasePrice;
  }
}
