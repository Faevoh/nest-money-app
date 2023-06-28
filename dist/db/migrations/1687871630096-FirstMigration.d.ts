import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FirstMigration1687871630096 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
