import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car, Owner } from '@entities';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service'

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Car])],
  controllers: [OwnerController],
  providers: [OwnerService]
})
export class OwnerModule {}
