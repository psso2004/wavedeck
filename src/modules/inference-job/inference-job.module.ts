import { ContainerModule } from "inversify";
import { IOC_TYPE } from "../../types/ioc.type";
import { InferenceJobController } from "./inference-job.controller";

export class InferenceJobModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<InferenceJobController>(IOC_TYPE.Controller).to(
                InferenceJobController
            );
        });
    }
}
