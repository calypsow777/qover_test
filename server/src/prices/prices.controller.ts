import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { PricesService } from './prices.service';
import { GetPricesParams, GetPricesResponseDto } from './dtos';
import { GetPricesPipe } from './get-prices.pipe';
import { roundToTwoDecimalPlaces } from 'src/common/utils';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get('carMakes')
  async getCarMakes(): Promise<string[]> {
    return this.pricesService.getAllCarBrands();
  }

  @Get(':driverAge/:carMake/:purchasePrice')
  @UsePipes(GetPricesPipe)
  async getPrices(
    @Param() { purchasePrice, price }: GetPricesParams,
  ): Promise<GetPricesResponseDto> {
    const {
      globalYearlyPrice,
      universalYearlyPrice,
      universalYearlyMultiplier,
    } = price;
    return {
      global: {
        yearlyPrice: roundToTwoDecimalPlaces(globalYearlyPrice),
      },
      universal: {
        yearlyPrice: roundToTwoDecimalPlaces(
          universalYearlyPrice + universalYearlyMultiplier * purchasePrice,
        ),
      },
    };
  }
}
