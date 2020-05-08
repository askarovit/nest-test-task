import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { ICarCreate, ICarDTO } from './car.interface';

@Controller('cars')
export class CarController {
  constructor(private service: CarService) {}

  @Get()
  findAll(): Promise<ICarDTO[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: ICarCreate): Promise<ICarDTO> {
    return this.service.create(data);
  }
}
