import { Container } from "inversify";
import { DatabaseModule } from "./modules/database.module";
import { UserModule } from "./modules/user/user.module";

export class AppContainer {
    public static createContainer(): Container {
        const container = new Container();
        container.load(new DatabaseModule(), new UserModule());

        return container;
    }
}
