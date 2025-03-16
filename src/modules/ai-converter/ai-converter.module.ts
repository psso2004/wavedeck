import { ContainerModule } from "inversify";
import { IOC_TYPE } from "../../types/ioc.type";
import { AIConverterService } from "./ai-converter.service";

export class AIConverterModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<AIConverterService>(IOC_TYPE.AIConverterService).to(
                AIConverterService
            );
        });
    }
}
