import { Container } from "inversify";
import { AudioFileModule } from "./modules/audio-file/audio-file.module";
import { DatabaseModule } from "./modules/database.module";
import { InferenceJobModule } from "./modules/inference-job/inference-job.module";
import { UserModule } from "./modules/user/user.module";
import { JoiValidatorProvider } from "./providers/validator.provider";
import { IOC_TYPE } from "./types/ioc.type";

export class AppContainer {
    public static createContainer(): Container {
        const container = new Container();
        container.load(
            new DatabaseModule(),
            new UserModule(),
            new AudioFileModule(),
            new InferenceJobModule()
        );
        container
            .bind<JoiValidatorProvider>(IOC_TYPE.JoiValidator)
            .to(JoiValidatorProvider)
            .inSingletonScope();

        return container;
    }
}
