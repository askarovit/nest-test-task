import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { BaseEntity } from './BaseEntity';
import { Owner } from './owner.entity';

@Entity({ name: 'car' })
export class Car extends BaseEntity {

  @Column()
  price: number

  @Column({ type: 'datetime' })
  firstRegistrationDate: Date

  @ManyToOne(type => Manufacturer)
  @JoinColumn()
  manufacturer: string

  @OneToMany(type => Owner, owner => owner.car)
  @JoinColumn()
  owners: Owner[]
}