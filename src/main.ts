import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AppRouter } from "./app.router";

async function bootstrap() {
    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(AppRouter.createRouter());

    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}
bootstrap();
