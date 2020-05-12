import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car, Manufacturer, Owner } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Owner, Manufacturer])],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}