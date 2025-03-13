import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import yaml from "js-yaml";
import { Sequelize } from "sequelize-typescript";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import { AppContainer } from "./app.container";
import { AppRouter } from "./app.router";
import { ErrorHandler } from "./middlewares/error-handler";
import { IOC_TYPE } from "./types/ioc.type";

async function bootstrap() {
    dotenv.config();

    const container = AppContainer.createContainer();
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(AppRouter.createRouter(container));

    app.use(ErrorHandler.handleErrors);

    const swaggerDocument = yaml.load(
        fs.readFileSync("./swagger.yaml", "utf8")
    ) as JsonObject;
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    const sequelize = container.get<Sequelize>(IOC_TYPE.Sequelize);
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
