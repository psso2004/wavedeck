import { ContainerModule } from "inversify";
import { Sequelize } from "sequelize-typescript";

export class DatabaseModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            const sequelize = new Sequelize({
                dialect: "mysql",
                host: process.env.DB_HOST || "localhost",
                port: process.env.DB_PORT
                    ? parseInt(process.env.DB_PORT, 10)
                    : 3306,
                username: process.env.DB_USERNAME || "pung",
                password: process.env.DB_PASSWORD || "pungPassword!23",
                database: process.env.DB_DATABASE || "wavedeck",
                models: [__dirname + "/**/*.model.{ts,js}"],
            });

            bind<Sequelize>("Sequelize").toConstantValue(sequelize);
        });
    }
}
