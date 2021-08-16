import { PricesService } from './prices.service';
import { GetPricesParams, GetPricesResponseDto } from './dtos';
export declare class PricesController {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    getCarMakes(): Promise<string[]>;
    getPrices({ purchasePrice, price }: GetPricesParams): Promise<GetPricesResponseDto>;
}
