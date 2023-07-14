import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RestartMigration1689252411113 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
