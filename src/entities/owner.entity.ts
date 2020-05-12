import { Entity, Column, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Car } from './car.entity';

@Entity({ name: 'owner' })
export class Owner extends BaseEntity {

  @Column({ length: 50 })
  name: string

  @Column({ type: 'datetime' })
  purchaseDate: Date

  @ManyToOne(type => Car, car => car.owners)
  @JoinColumn()
  car: string;
}