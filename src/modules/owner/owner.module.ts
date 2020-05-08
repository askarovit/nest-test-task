import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service'
import { Owner } from '../../entities/owner.entity';
import { Car } from '../../entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Car])],
  controllers: [OwnerController],
  providers: [OwnerService]
})
export class OwnerModule {}
