import { Body, Controller, Get, Post, Put, UsePipes, Logger, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { ICarDTO, IDeleteResponse } from './car.interface';
import { CarDto } from './car.dto';
import { ValidationPipe } from '../../shared/validation.pipe';

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

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() data: CarDto): Promise<ICarDTO> {
    this.logger.log(JSON.stringify(data));
    return this.service.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: CarDto):Promise<ICarDTO> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  deleteOwnerById(@Param('id') id: string): Promise<IDeleteResponse> {
    return this.service.deleteById(id);
  }
}
