import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CarModule } from '@modules/cars/car.module';
import { ConfigModule } from '@nestjs/config';
import { OwnerModule } from '@modules/owner/owner.module';
import { HttpErrorFilter } from '@shared/http-error.filter';
import { LoggingInterceptor } from '@shared/logging.interceptor';
import { ValidationPipe } from '@shared/validation.pipe';
import { ResponseInterceptor } from '@shared/response.interceptor.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    CarModule,
    OwnerModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
