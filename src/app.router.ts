import { NextFunction, Request, Response, Router } from "express";
import { Container } from "inversify";
import { IController } from "./interfaces/controller.interface";
import { IOC_TYPE } from "./types/ioc.type";

export const asyncMiddleware =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

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

        this.router.stack.forEach(({ route }) => {
            route?.stack.forEach((layer: any) => {
                if (typeof layer.handle === "function") {
                    layer.handle = asyncMiddleware(layer.handle);
                }
            });
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public static createRouter(container: Container): Router {
        return new AppRouter(container).getRouter();
    }
}
