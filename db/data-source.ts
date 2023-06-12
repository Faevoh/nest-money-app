import { DataSource, DataSourceOptions,  } from "typeorm";
import {config} from "dotenv";
import { User } from "src/Entities/userEntity.entity";
import { Compliances } from "src/Entities/compEntity.entity";
import { Airtime } from "src/Entities/airtimeEntity.entity";
import { Wallet } from "src/Entities/walletEntity.entity";
import { Transactions } from "src/Entities/transactionEntity.entity";

config();

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "money_App",
    entities: [User, Compliances, Airtime, Wallet, Transactions ],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;