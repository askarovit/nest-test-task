import { Body, Controller, Get, Post, Put, UsePipes, Logger, Param, Delete } from '@nestjs/common';
import { ValidationPipe } from '@shared/validation.pipe';
import { Transaction, EntityManager, TransactionManager } from 'typeorm';
import { CarService } from './car.service';
import { ICarDTO, IDeleteResponse, IManufacturerCar, IResultTransaction } from './car.interface';
import { CarDto } from './car.dto';

@Controller('cars')
export class CarController {
  private logger = new Logger('CarController');

  constructor(private service: CarService) {}

  @Get()
  findAll(): Promise<ICarDTO[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ICarDTO> {
    return this.service.findById(id);
  }

  @Get(':id/manufacturer')
  getManufacturerCar(@Param('id') id: string): Promise<IManufacturerCar> {
    return this.service.getManufacturerCar(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() data: CarDto): Promise<ICarDTO> {
    this.logger.log(JSON.stringify(data));
    return this.service.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: CarDto):Promise<ICarDTO> {
    this.logger.log(`Update by id : ${JSON.stringify(id)}`);
    return this.service.update(id, data);
  }

  @Delete(':id')
  deleteOwnerById(@Param('id') id: string): Promise<IDeleteResponse> {
    this.logger.log(`Delete by id : ${JSON.stringify(id)}`);
    return this.service.deleteById(id);
  }

  @Post('recount')
  @Transaction()
  async updateCars(@TransactionManager() manager: EntityManager): Promise<IResultTransaction> {
    return this.service.transactionUpdateCars(manager);
  }
}
