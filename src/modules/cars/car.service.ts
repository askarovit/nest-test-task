import { Injectable } from '@nestjs/common';
import { ICarDTO, IDeleteResponse } from './car.interface';
import { CarDto } from './car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../entities/car.entity';
import { Manufacturer } from '../../entities/manufacturer.entity';
import { Owner } from '../../entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
    @InjectRepository(Manufacturer)
    private manufacturerRepo: Repository<Manufacturer>,
    @InjectRepository(Owner)
    private ownerRepo: Repository<Owner>
  ) {}

  async findAll(): Promise<Array<ICarDTO>> {
    return await this.repository.find({ relations: ['manufacturer', 'owners'] });
  };

  async findById(id: string): Promise<ICarDTO> {
    return await this.repository.findOne({
      where: { id },
      relations: ['manufacturer', 'owners']
    })
  }

  async create(data: CarDto): Promise<ICarDTO> {
    const car = await this.repository.create(data);
    await this.repository.save(car);

    return car;
  }

  async update(id: string, data: CarDto): Promise<ICarDTO> {
    await this.repository.update({id}, data);
    return await this.repository.findOne({where: {id}})
  }

  async deleteById(id: string): Promise<IDeleteResponse> {
    await this.repository.delete(id);
    return { deleted: true };
  }
}
