import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewMigration031686308827699 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
