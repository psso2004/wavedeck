import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Sequelize } from "sequelize-typescript";
import { AppContainer } from "./app.container";
import { AppRouter } from "./app.router";

async function bootstrap() {
    dotenv.config();

    const container = AppContainer.createContainer();
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(AppRouter.createRouter(container));

    const sequelize = container.get<Sequelize>("Sequelize");
    try {
        await sequelize.authenticate();
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
bootstrap();
