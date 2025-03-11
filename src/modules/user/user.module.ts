import { ContainerModule } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

// todo: test 모듈
export class UserModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<IController>("Controller").to(UserController);
            bind<UserService>("UserService").to(UserService);
        });
    }
}
