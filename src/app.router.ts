import { Router } from "express";
import { Container } from "inversify";
import { IController } from "./interfaces/controller.interface";
import { IOC_TYPE } from "./types/ioc.type";

export class AppRouter {
    private router: Router;

    constructor(private container: Container) {
        this.router = Router();
        const controllers = this.container.getAll<IController>(
            IOC_TYPE.Controller
        );

        controllers.forEach((controller) => {
            controller.registerRoutes(this.router);
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public static createRouter(container: Container): Router {
        return new AppRouter(container).getRouter();
    }
}
