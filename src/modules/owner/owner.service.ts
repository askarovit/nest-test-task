import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '@entities';
import { IOwnerDTO, IOwnerUpdate, IOwnerDeleteResponse } from './owner.interface';

@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner)
    private repository: Repository<Owner>
  ) {}

  async findAllOwners(): Promise<Array<IOwnerDTO>> {
    return await this.repository.find();
  };

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
