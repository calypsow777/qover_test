import { Injectable } from '@nestjs/common';
import { Price, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  async getAllCarBrands(): Promise<string[]> {
    const prices = await this.prisma.price.findMany({
      where: {},
      distinct: ['carMake'],
    });

    return prices.map((p) => p.carMake);
  }

  async findUnique(data: Prisma.PriceFindUniqueArgs): Promise<Price> {
    return this.prisma.price.findUnique(data);
  }
}
