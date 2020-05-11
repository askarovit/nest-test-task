export interface IOwnerModel {
  id?: string
  name: string;
  purchaseDate: Date;
}

export class OwnerModel implements IOwnerModel {
  id: string;
  name: string;
  purchaseDate: Date;

  constructor(body: IOwnerModel) {
    this.id= body.id || null;
    this.name = body.name;
    this.purchaseDate = body.purchaseDate;
  }
}