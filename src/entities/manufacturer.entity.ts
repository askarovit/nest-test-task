import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'manufacturer' })
export class Manufacturer extends BaseEntity {

  @Column({ length: 50 })
  name: string

  @Column()
  phone: string

  @Column({ type: 'bigint' })
  siret: number
}