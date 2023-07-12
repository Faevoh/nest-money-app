import { MigrationInterface, QueryRunner } from "typeorm";
export declare class ChangedUserEntity1689160915939 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
