import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Owner, Car } from '../entities';
import { OwnerSeed } from './seed/owner.seed';

export class seedTableOwner1588956054376 implements MigrationInterface {
    private randomInteger(min, max): number {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            const cars = await getConnection().getRepository(Car).find();
            const seed = OwnerSeed.map(owner => {
                owner['car'] = cars[this.randomInteger(0, cars.length)];
                return owner;
            })
            const owners = await getConnection().getRepository(Owner).create(seed);
            await getConnection().getRepository(Owner).save(owners);
        } catch (e) {
            console.log('Error: Seeding to owner table.\n Err: ', e);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
