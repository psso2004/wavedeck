import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import { AppContainer } from "./app.container";
import { AppRouter } from "./app.router";
import { ErrorHandler } from "./middlewares/error-handler";
import { RequestLogService } from "./modules/request-log/request-log.service";
import { IOC_TYPE } from "./types/ioc.type";

async function bootstrap() {
    process.on("unhandledRejection", (reason, promise) => {
        console.error(promise, reason);
    });
    process.on("uncaughtException", (err) => {
        console.error(err);
    });

    dotenv.config();

    const container = AppContainer.createContainer();
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const requestLogger = container.get<RequestLogService>(
        IOC_TYPE.RequestLogService
    );
    app.use((req, res, next) => requestLogger.logRequest(req, res, next));

    app.use(AppRouter.createRouter(container));

    app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

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
