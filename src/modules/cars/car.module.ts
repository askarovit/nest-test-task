import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Owner } from '../../entities/owner.entity';
import { Manufacturer } from '../../entities/manufacturer.entity';
import { Car } from '../../entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Owner, Manufacturer])],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}