import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UsersChanges1688084151461 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
