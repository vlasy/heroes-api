import "reflect-metadata"
import { DataSource } from "typeorm"
import { Character } from "./entity/Character"
import config from '../../config'
import { Nemesis } from "./entity/Nemesis"
import { Secrete } from "./entity/Secrete"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: false,
    logging: true,
    entities: [Character, Nemesis, Secrete],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))