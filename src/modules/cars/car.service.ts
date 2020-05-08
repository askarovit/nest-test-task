import { Injectable } from '@nestjs/common';
import { ICarCreate, ICarDTO } from './car.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../entities/car.entity';
import { Manufacturer } from '../../entities/manufacturer.entity';
// import { Owner } from '../../entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
    // @InjectRepository(Owner)
    // private ownerRepo: Repository<Owner>
  ) {}

  async findAll(): Promise<Array<ICarDTO>> {
    return await this.repository.find({ relations: ['manufacturer', 'owners'] });
  };

  async create(data: ICarCreate): Promise<ICarDTO> {
    const car = await this.repository.create(data);
    await this.repository.save(car);

    return car;
  }
}
