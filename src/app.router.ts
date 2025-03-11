import { Router } from "express";
import { AppContainer } from "./app.container";
import { IController } from "./interfaces/controller.interface";

export class AppRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        const container = AppContainer.createContainer();
        const controllers = container.getAll<IController>("Controller");

        controllers.forEach((controller) => {
            controller.registerRoutes(this.router);
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public static createRouter(): Router {
        return new AppRouter().getRouter();
    }
}
