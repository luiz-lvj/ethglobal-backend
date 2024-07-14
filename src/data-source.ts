import { DataSource } from "typeorm";
import User from "./entities/User";
import TxHash from "./entities/TxHash";

export const AppDataSource = new DataSource({
    type: "postgres",
    url:process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV === "development" ? true : true, // never true in production
    logging: false,
    entities: [User, TxHash],
    migrations: [],
    subscribers: [],
})