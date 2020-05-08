import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { Manufacturer } from '../entities/manufacturer.entity';
import { ManufacturerSeed } from './seed/manufacturer.seed';

export class seedTableManufacturer1588772607752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            const manufacturers = await getConnection().getRepository(Manufacturer).create(ManufacturerSeed);
            await getConnection().getRepository(Manufacturer).save(manufacturers);
        } catch (e) {
            console.log('Error: Seeding to table.\n Err: ', e);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
