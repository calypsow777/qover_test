import { Price, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class PricesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCarBrands(): Promise<string[]>;
    findUnique(data: Prisma.PriceFindUniqueArgs): Promise<Price>;
}
