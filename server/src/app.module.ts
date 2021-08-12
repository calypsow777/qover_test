import { Module } from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { AllExceptionsFilter } from './common/exception-filters/all-exceptions.filter';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
