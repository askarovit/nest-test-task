import { IOwnerDTO } from '../owner/owner.interface';
import { IManufacturerModel } from '../manufacturer/manufacturer.model';
export interface ICarDTO {
  id: string;
  price: number;
  firstRegistrationDate: string | Date;
  manufacturer: string;
  owners?: IOwnerDTO[];
}

export interface IDeleteResponse {
  deleted: boolean;
}

export interface IManufacturerCar {
  id: string;
  manufacturer: IManufacturerModel | string;
}

export interface IResultTransaction {
  error: string | null;
  success: boolean;
}