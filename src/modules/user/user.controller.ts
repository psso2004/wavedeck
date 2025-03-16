import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { IOC_TYPE } from "../../types/ioc.type";
import User from "./models/user.model";
import { UserService } from "./user.service";

@injectable()
export class UserController implements IController {
    constructor(
        @inject(IOC_TYPE.UserService)
        private readonly userService: UserService
    ) {}

    public registerRoutes(router: Router): void {
        router.get("/users", (req, res) => this.getUsers(req, res));
    }

    private async getUsers(req: Request, res: Response): Promise<User[]> {
        const users = await this.userService.getUsers();

        res.json(users);
        return users;
    }
}
