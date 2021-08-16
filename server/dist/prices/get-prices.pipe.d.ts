import { PipeTransform } from '@nestjs/common';
import { PricesService } from './prices.service';
export declare class GetPricesPipe implements PipeTransform {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    transform(value: any): Promise<{
        driverAge: number;
        carMake: any;
        purchasePrice: number;
        price: import(".prisma/client").Price;
    }>;
}
