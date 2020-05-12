import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, LessThan } from 'typeorm';
import * as moment from 'moment';
import { ICarDTO, IDeleteResponse, IManufacturerCar, IResultTransaction } from './car.interface';
import { CarDto } from './car.dto';
import { Car, Owner, Manufacturer } from '../../entities';

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
    const car: ICarDTO = await this.repository.create(data);
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

  async getManufacturerCar(id: string): Promise<IManufacturerCar> {
    const manufacturer = await this.repository.findOne({
      where: { id },
      relations: ['manufacturer'],
      select: ['id', 'manufacturer']
    })
    return manufacturer;
  }

  async transactionUpdateCars(manager: EntityManager): Promise<IResultTransaction> {
    const resultRemoveOwners: IResultTransaction = await this.removeDeprecatedOwners(manager);

    if (resultRemoveOwners.error) {
      return resultRemoveOwners;
    }

    const isApplyDiscount = await this.applyDiscount(manager);

    if (isApplyDiscount.error) {
      return isApplyDiscount;
    }

    return { success: true, error: null };
  }

  private async applyDiscount(manager: EntityManager): Promise<IResultTransaction> {
    let result: IResultTransaction = {
      success: true,
      error: null
    }
    try {
      const from = moment().subtract(18, 'month').format('YYYY-MM-DD');
      const to = moment().subtract(12, 'month').format('YYYY-MM-DD');

      await manager.createQueryBuilder()
        .update(Car)
        .set({
          price: () => "price * 0.8"
        })
        .where("firstRegistrationDate BETWEEN  :from AND :to", { from, to })
        .execute()

      return result;
    } catch (err) {
      result.success = false;
      result.error = err.message;
    }
  }

  private async removeDeprecatedOwners(manager: EntityManager): Promise<IResultTransaction> {
    let result: IResultTransaction = {
      success: true,
      error: null
    }
    const less18month = moment().subtract(18, 'month');
    try {
      const ownersDeprecated = await manager.find(Owner, {
        where: {
          purchaseDate: LessThan(less18month.toISOString())
        },
        select: ["id"]
      })
      if (ownersDeprecated.length > 0) {
        await manager.remove(Owner, ownersDeprecated);
      }
      return result;
    } catch(err) {
        result.success = false;
        result.error = err.message;
        return result;
    }
  }
}
