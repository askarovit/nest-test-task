import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './modules/cars/car.module';
import { ConfigModule } from '@nestjs/config';
import { OwnerModule } from './modules/owner/owner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    CarModule,
    OwnerModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
