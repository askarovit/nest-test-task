import { IManufacturerDTO } from '../manufacturer/manufacturer.interface';
import { IOwnerDTO } from '../owner/owner.interface';

export interface ICarDTO {
  id: string;
  price: number;
  firstRegistrationDate: string | Date;
  manufacturer: string;
  owners?: IOwnerDTO[] | string[];
}

export interface ICarCreate {
  price: number;
  firstRegistrationDate: Date;
  manufacturer: string;
}