import { ContainerModule } from "inversify";
import { IOC_TYPE } from "../../types/ioc.type";
import { UserService } from "./user.service";

export class UserModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<UserService>(IOC_TYPE.UserService).to(UserService);
        });
    }
}
