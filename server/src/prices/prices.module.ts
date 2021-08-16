import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PricesService],
  controllers: [PricesController],
  imports: [PrismaModule],
})
export class PricesModule {}
