import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ComplianceChanges11688029052415 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
