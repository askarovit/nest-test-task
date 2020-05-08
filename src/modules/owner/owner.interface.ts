import { ICarDTO } from '../cars/car.interface';

export interface IOwnerDTO {
  id: string;
  name: string;
  purchaseDate: Date;
}

export interface IOwnerCreate {
  name: string;
  purchaseDate?: Date;
  car?: string | ICarDTO;
}

export interface IOwnerUpdate {
  name?: string;
  purchaseDate?: Date;
}

export interface IOwnerDeleteResponse {
  deleted: boolean;
}