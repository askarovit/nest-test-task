export interface IManufacturerModel {
  id?: string;
  name: string;
  phone: string;
  siret: number;
}

export class ManufacturerModel implements IManufacturerModel {
  id: string;
  name: string;
  phone: string;
  siret: number;

  constructor(body: IManufacturerModel) {
    this.id = body.id;
    this.name = body.name;
    this.phone = body.phone;
    this.siret = body.siret;
  }
}