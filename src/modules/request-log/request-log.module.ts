import { ContainerModule } from "inversify";
import { IOC_TYPE } from "../../types/ioc.type";
import { RequestLogService } from "./request-log.service";

export class RequestLogModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<RequestLogService>(IOC_TYPE.RequestLogService)
                .to(RequestLogService)
                .inSingletonScope();
        });
    }
}
