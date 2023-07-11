import { DataSource, DataSourceOptions,  } from "typeorm";
import {config} from "dotenv";
import { User } from "src/Entities/userEntity.entity";
import { Compliances } from "src/Entities/compEntity.entity";
import { Airtime } from "src/Entities/airtimeEntity.entity";
import { Wallet } from "src/Entities/walletEntity.entity";
import { Transactions } from "src/Entities/transactionEntity.entity";

config();

export const hostDataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.RSD_ENDPOINT,
    port: parseInt(process.env.RSD_PORT),
    username: process.env.RSD_USERNAME,
    password: process.env.RSD_PASSWORD,
    database: process.env.RSD_DATABASE,
    entities: [User, Compliances, Airtime, Wallet, Transactions ],
    synchronize: true,
    migrations: ["dist/db/migrations/*.js"]
}

const hostDataSource = new DataSource(hostDataSourceOptions);

export default hostDataSource;