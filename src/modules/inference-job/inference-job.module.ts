import { Queue } from "bullmq";
import { ContainerModule } from "inversify";
import Redis from "ioredis";
import { IOC_TYPE } from "../../types/ioc.type";
import { InferenceJobConsumer } from "./inference-job.consumer";
import { InferenceJobController } from "./inference-job.controller";
import { InferenceJobService } from "./inference-job.service";

export class InferenceJobModule extends ContainerModule {
    constructor() {
        super(({ bind }) => {
            bind<InferenceJobController>(IOC_TYPE.Controller).to(
                InferenceJobController
            );
            bind<InferenceJobService>(IOC_TYPE.InferenceJobService).to(
                InferenceJobService
            );
            bind<Queue>(IOC_TYPE.InferenceJobQueue)
                .toDynamicValue(
                    () =>
                        new Queue("inferenceJob", {
                            connection: new Redis({
                                host: process.env.REDIS_HOST || "localhost",
                                port: process.env.REDIS_PORT
                                    ? parseInt(process.env.REDIS_PORT, 10)
                                    : 6379,
                            }),
                            defaultJobOptions: {
                                attempts: 3,
                                backoff: {
                                    type: "fixed",
                                    delay: 5000,
                                },
                            },
                        })
                )
                .inSingletonScope();
            bind<InferenceJobConsumer>(IOC_TYPE.InferenceJobConsumer)
                .to(InferenceJobConsumer)
                .inSingletonScope();
        });
    }
}
