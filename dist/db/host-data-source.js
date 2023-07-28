"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostDataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const userEntity_entity_1 = require("../src/Entities/userEntity.entity");
const compEntity_entity_1 = require("../src/Entities/compEntity.entity");
const airtimeEntity_entity_1 = require("../src/Entities/airtimeEntity.entity");
const walletEntity_entity_1 = require("../src/Entities/walletEntity.entity");
const transactionEntity_entity_1 = require("../src/Entities/transactionEntity.entity");
const accountEntity_entity_1 = require("../src/Entities/accountEntity.entity");
(0, dotenv_1.config)();
exports.hostDataSourceOptions = {
    type: "mysql",
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT),
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    entities: [userEntity_entity_1.User, compEntity_entity_1.Compliances, airtimeEntity_entity_1.Airtime, walletEntity_entity_1.Wallet, transactionEntity_entity_1.Transactions, accountEntity_entity_1.AccountType],
    synchronize: true,
    migrations: ["dist/db/migrations/*.js"],
    url: process.env.MYSQL_URL
};
const hostDataSource = new typeorm_1.DataSource(exports.hostDataSourceOptions);
exports.default = hostDataSource;
//# sourceMappingURL=host-data-source.js.map