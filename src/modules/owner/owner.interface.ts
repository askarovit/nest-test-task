import { ICarDTO } from '@modules/cars/car.interface';

export interface IOwnerDTO {
  id: string;
  name: string;
  purchaseDate: Date | string;
}

export interface IOwnerCreate {
  name: string;
  purchaseDate?: Date | string;
  car?: string | ICarDTO;
}

export interface IOwnerUpdate {
  name?: string;
  purchaseDate?: string;
}

export interface IOwnerDeleteResponse {
  deleted: boolean;
}