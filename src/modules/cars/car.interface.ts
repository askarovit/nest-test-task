import { IOwnerDTO } from '../owner/owner.interface';

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