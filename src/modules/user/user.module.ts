import { ContainerModule } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { IOC_TYPE } from "../../types/ioc.type";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

// todo: test 모듈
export class UserModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<IController>(IOC_TYPE.Controller).to(UserController);
            bind<UserService>(IOC_TYPE.UserService).to(UserService);
        });
    }
}
