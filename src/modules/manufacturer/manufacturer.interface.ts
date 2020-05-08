export interface IManufacturerDTO {
  id: string;
  name: string;
  phone: string;
  siret: number;
}

export interface IManufacturerCreate {
  name: string;
  phone: string;
  siret: number;
}