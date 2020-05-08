import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarSeed } from './seed/car.seed';

export class seedTableCar1588772613828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            const cars = await getConnection().getRepository(Car).create(CarSeed);
            await getConnection().getRepository(Car).save(cars);
        } catch (e) {
            console.log('Error: Seeding to table.\n Err: ', e);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}

}
