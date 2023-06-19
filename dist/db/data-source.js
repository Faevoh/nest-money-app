"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const userEntity_entity_1 = require("../src/Entities/userEntity.entity");
const compEntity_entity_1 = require("../src/Entities/compEntity.entity");
const airtimeEntity_entity_1 = require("../src/Entities/airtimeEntity.entity");
const walletEntity_entity_1 = require("../src/Entities/walletEntity.entity");
const transactionEntity_entity_1 = require("../src/Entities/transactionEntity.entity");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "money_App",
    entities: [userEntity_entity_1.User, compEntity_entity_1.Compliances, airtimeEntity_entity_1.Airtime, walletEntity_entity_1.Wallet, transactionEntity_entity_1.Transactions],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"]
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map