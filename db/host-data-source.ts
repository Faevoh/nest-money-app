import { DataSource, DataSourceOptions,  } from "typeorm";
import {config} from "dotenv";
import { User } from "src/Entities/userEntity.entity";
import { Compliances } from "src/Entities/compEntity.entity";
import { Airtime } from "src/Entities/airtimeEntity.entity";
import { Wallet } from "src/Entities/walletEntity.entity";
import { Transactions } from "src/Entities/transactionEntity.entity";
import { AccountType } from "src/Entities/accountEntity.entity";

config();

export const hostDataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT),
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    entities: [User, Compliances, Airtime, Wallet, Transactions, AccountType ],
    synchronize: true,
    migrations: ["dist/db/migrations/*.js"],
    url: process.env.MYSQL_URL
}

const hostDataSource = new DataSource(hostDataSourceOptions);

export default hostDataSource;