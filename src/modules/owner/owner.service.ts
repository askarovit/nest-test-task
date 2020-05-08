import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../../entities/owner.entity';
// import { Car } from '../../entities/car.entity';
import { IOwnerDTO, IOwnerCreate, IOwnerUpdate, IOwnerDeleteResponse } from './owner.interface';

@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner)
    private repository: Repository<Owner>
  ) {}

  async findAllOwners(): Promise<Array<IOwnerDTO>> {
    return await this.repository.find();
  };

  // async create(data: IOwnerCreate): Promise<IOwnerDTO> {
  //   const owner = await this.repository.create(data);
  //   await this.repository.save(owner);
  //
  //   return owner;
  // }

  async findOwnerById(id: string): Promise<IOwnerDTO> {
    return await this.repository.findOne({where: { id }})
  }

  async updateOwnerById(id: string, data: IOwnerUpdate): Promise<IOwnerDTO> {
    await this.repository.update({id}, data);
    return await this.repository.findOne({where: {id}})
  }

  async deleteOwnerById(id: string): Promise<IOwnerDeleteResponse> {
    await this.repository.delete(id);
    return { deleted: true };
  }
}
