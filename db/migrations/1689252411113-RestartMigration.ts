import { MigrationInterface, QueryRunner } from "typeorm";

export class RestartMigration1689252411113 implements MigrationInterface {
    name = 'RestartMigration1689252411113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP FOREIGN KEY \`FK_0fd7f2cb9ae4898e9947d42a0f1\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_6bb58f2b6e30cb51a6504599f41\``);
        await queryRunner.query(`ALTER TABLE \`wallet\` DROP FOREIGN KEY \`FK_35472b1fe48b6330cd349709564\``);
        await queryRunner.query(`DROP INDEX \`IDX_35d380a3d22b8ae0bce15736d3\` ON \`compliances\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`BVN\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`BVN\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD UNIQUE INDEX \`IDX_35d380a3d22b8ae0bce15736d3\` (\`BVN\`)`);
        await queryRunner.query(`DROP INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\` ON \`compliances\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`NIN\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`NIN\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD UNIQUE INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\` (\`NIN\`)`);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`businessDetails\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`businessDetails\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\` ON \`compliances\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`bankCode\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`bankCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD UNIQUE INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\` (\`bankCode\`)`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`currency\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionType\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionRef\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionRef\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionPin\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionPin\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`accountNumber\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`accountNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`accountName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`accountName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resetToken\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`airtime\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`airtime\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`airtime\` DROP COLUMN \`serviceNetwork\``);
        await queryRunner.query(`ALTER TABLE \`airtime\` ADD \`serviceNetwork\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD CONSTRAINT \`FK_0fd7f2cb9ae4898e9947d42a0f1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_6bb58f2b6e30cb51a6504599f41\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallet\` ADD CONSTRAINT \`FK_35472b1fe48b6330cd349709564\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wallet\` DROP FOREIGN KEY \`FK_35472b1fe48b6330cd349709564\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_6bb58f2b6e30cb51a6504599f41\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP FOREIGN KEY \`FK_0fd7f2cb9ae4898e9947d42a0f1\``);
        await queryRunner.query(`ALTER TABLE \`airtime\` DROP COLUMN \`serviceNetwork\``);
        await queryRunner.query(`ALTER TABLE \`airtime\` ADD \`serviceNetwork\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`airtime\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`airtime\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resetToken\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`accountName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`accountName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`accountNumber\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`accountNumber\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionPin\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionPin\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionRef\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionRef\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`transactionType\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`transactionType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD \`currency\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`bankCode\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`bankCode\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\` ON \`compliances\` (\`bankCode\`)`);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`businessDetails\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`businessDetails\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`NIN\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`NIN\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\` ON \`compliances\` (\`NIN\`)`);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP INDEX \`IDX_35d380a3d22b8ae0bce15736d3\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP COLUMN \`BVN\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD \`BVN\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_35d380a3d22b8ae0bce15736d3\` ON \`compliances\` (\`BVN\`)`);
        await queryRunner.query(`ALTER TABLE \`wallet\` ADD CONSTRAINT \`FK_35472b1fe48b6330cd349709564\` FOREIGN KEY (\`userId\`) REFERENCES \`money_app\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_6bb58f2b6e30cb51a6504599f41\` FOREIGN KEY (\`userId\`) REFERENCES \`money_app\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD CONSTRAINT \`FK_0fd7f2cb9ae4898e9947d42a0f1\` FOREIGN KEY (\`userId\`) REFERENCES \`money_app\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
