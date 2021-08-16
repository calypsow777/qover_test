import { PipeTransform, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { PricesService } from './prices.service';
import { CustomError } from '../common/errors/CustomError';
import { CustomHttpException } from '../common/errors/CustomHttpException';
import { GetPricesDto } from './dtos';

@Injectable()
export class GetPricesPipe implements PipeTransform {
  constructor(private readonly pricesService: PricesService) {}

  async transform(value: any) {
    const { driverAge, carMake, purchasePrice } = value;
    const numDriverAge = Number.parseInt(driverAge, 10);
    const numPurchasePrice = Number.parseInt(purchasePrice, 10);

    const errors = await validate(
      new GetPricesDto({
        driverAge: numDriverAge,
        carMake,
        purchasePrice: numPurchasePrice,
      }),
      {
        stopAtFirstError: true,
      },
    );

    if (errors.length > 0) {
      const resErrors: CustomError[] = [];
      for (const error of errors) {
        const contexts = error.contexts;
        for (const contextKey in contexts) {
          resErrors.push(contexts[contextKey].customError);
        }
      }
      throw new CustomHttpException({
        customErrors: resErrors,
      });
    }

    if (numDriverAge < 25 && carMake === 'Porsche') {
      throw new CustomHttpException({
        customErrors: [
          new CustomError(
            'prices-9',
            'Sorry! We cannot accept this particular risk.',
          ),
        ],
      });
    }

    const price = await this.pricesService.findUnique({
      where: { carMake },
    });

    if (!price) {
      throw new CustomHttpException({
        customErrors: [
          new CustomError('prices-10', 'We do not cover this car make.'),
        ],
      });
    }

    return {
      driverAge: numDriverAge,
      carMake,
      purchasePrice: numPurchasePrice,
      price,
    };
  }
}
