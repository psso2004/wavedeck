import { ContainerModule } from "inversify";
import { IOC_TYPE } from "../../types/ioc.type";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export class UserModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<UserController>(IOC_TYPE.Controller).to(UserController);
            bind<UserService>(IOC_TYPE.UserService).to(UserService);
        });
    }
}
