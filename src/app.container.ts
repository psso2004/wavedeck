import { Container } from "inversify";
import { UserModule } from "./modules/user/user.module";

export class AppContainer {
    public static createContainer(): Container {
        const container = new Container();
        container.load(new UserModule());

        return container;
    }
}
