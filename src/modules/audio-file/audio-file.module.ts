import { ContainerModule } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { MulterProvider } from "../../providers/multer.provider";
import { IOC_TYPE } from "../../types/ioc.type";
import { AudioFileController } from "./\baudio-file.controller";
import { AudioFileService } from "./audio-file.service";

export class AudioFileModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<IController>(IOC_TYPE.Controller).to(AudioFileController);
            bind<AudioFileService>(IOC_TYPE.AudioFileService).to(
                AudioFileService
            );
            bind<MulterProvider>(IOC_TYPE.MulterProvider)
                .to(MulterProvider)
                .inSingletonScope();
        });
    }
}
