import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { UserService } from "./user.service";

// todo: test 컨트롤러
@injectable()
export class UserController implements IController {
    private userService: UserService;

    constructor(@inject("UserService") userService: UserService) {
        this.userService = userService;
    }

    public registerRoutes(router: Router): void {
        router.get("/users", (req, res) => this.getAllUsers(req, res));
    }

    private async getAllUsers(req: Request, res: Response): Promise<void> {
        console.log(req.query);
        res.json(this.userService.getUser());
    }
}
