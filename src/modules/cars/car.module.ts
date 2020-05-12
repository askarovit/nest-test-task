import { Module } from '@nestjs/common';
import { Car, Manufacturer, Owner } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Owner, Manufacturer])],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}