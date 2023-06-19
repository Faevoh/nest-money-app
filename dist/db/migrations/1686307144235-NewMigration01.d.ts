import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewMigration011686307144235 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
