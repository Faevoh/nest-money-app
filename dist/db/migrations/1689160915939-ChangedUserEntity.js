"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangedUserEntity1689160915939 = void 0;
class ChangedUserEntity1689160915939 {
    constructor() {
        this.name = 'ChangedUserEntity1689160915939';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`compliances\` (\`id\` int NOT NULL AUTO_INCREMENT, \`BVN\` varchar(255) NOT NULL, \`NIN\` varchar(255) NOT NULL, \`businessDetails\` varchar(255) NULL, \`bankCode\` varchar(255) NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_35d380a3d22b8ae0bce15736d3\` (\`BVN\`), UNIQUE INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\` (\`NIN\`), UNIQUE INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\` (\`bankCode\`), UNIQUE INDEX \`REL_0fd7f2cb9ae4898e9947d42a0f\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`currency\` varchar(255) NOT NULL, \`amount\` double(20,3) NULL, \`transactionType\` varchar(255) NOT NULL, \`transactionRef\` varchar(255) NOT NULL, \`transactionPin\` varchar(255) NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accountBalance\` double(20,2) NULL DEFAULT '0.00', \`userId\` int NOT NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`accountType\` tinyint NOT NULL DEFAULT 0, \`accountNumber\` varchar(255) NULL, \`accountName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resetToken\` varchar(255) NULL, \`resetTokenExpiry\` datetime NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`airtime\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`serviceNetwork\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`compliances\` ADD CONSTRAINT \`FK_0fd7f2cb9ae4898e9947d42a0f1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_6bb58f2b6e30cb51a6504599f41\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallet\` ADD CONSTRAINT \`FK_35472b1fe48b6330cd349709564\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`wallet\` DROP FOREIGN KEY \`FK_35472b1fe48b6330cd349709564\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_6bb58f2b6e30cb51a6504599f41\``);
        await queryRunner.query(`ALTER TABLE \`compliances\` DROP FOREIGN KEY \`FK_0fd7f2cb9ae4898e9947d42a0f1\``);
        await queryRunner.query(`DROP TABLE \`airtime\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`wallet\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
        await queryRunner.query(`DROP INDEX \`REL_0fd7f2cb9ae4898e9947d42a0f\` ON \`compliances\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3859c2ca7affcb6f62a1876d4\` ON \`compliances\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d46e6250c7f8c99f4cd042cbf\` ON \`compliances\``);
        await queryRunner.query(`DROP INDEX \`IDX_35d380a3d22b8ae0bce15736d3\` ON \`compliances\``);
        await queryRunner.query(`DROP TABLE \`compliances\``);
    }
}
exports.ChangedUserEntity1689160915939 = ChangedUserEntity1689160915939;
//# sourceMappingURL=1689160915939-ChangedUserEntity.js.map