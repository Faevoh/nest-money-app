import { MigrationInterface, QueryRunner } from "typeorm";
export declare class MadeChangeinUsers1688402285877 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
