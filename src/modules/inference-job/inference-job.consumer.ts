import { Job } from "bullmq";
import { inject, injectable } from "inversify";
import { WorkerHost } from "../../abstracts/worker-host.abstract";
import { IOC_TYPE } from "../../types/ioc.type";
import { AIConverterService } from "../ai-converter/ai-converter.service";
import AudioFileInferenceJob from "../audio-file/models/audio-file-inference-job.model";
import AudioFile from "../audio-file/models/audio-file.model";
import { InferenceJobService } from "./inference-job.service";

@injectable()
export class InferenceJobConsumer extends WorkerHost {
    constructor(
        @inject(IOC_TYPE.InferenceJobService)
        private readonly inferenceJobService: InferenceJobService,
        @inject(IOC_TYPE.AIConverterService)
        private readonly aiConverterService: AIConverterService
    ) {
        super("inferenceJob", {
            concurrency: 5,
        });

        this._worker.on("completed", (job) => {
            console.log(`${this._worker.name} job ${job.id} completed`);
        });

        this._worker.on("failed", (job, err) => {
            console.error(`${this._worker.name} job ${job?.id} failed:`, err);
        });
    }

    public async process(job: Job): Promise<void> {
        const inferenceJob = await this.inferenceJobService.getInferenceJob({
            where: {
                id: job.data.id,
            },
            include: [
                {
                    model: AudioFileInferenceJob,
                    include: [
                        {
                            model: AudioFile,
                        },
                    ],
                },
            ],
        });
        const converted = await this.aiConverterService.convertAudioWithAI(
            inferenceJob?.audioFileInferenceJobs[0].audioFile.filePath ?? "",
            inferenceJob?.voiceId ?? 0,
            inferenceJob?.pitch ?? 0,
            inferenceJob?.soundQuality ?? 0
        );

        if (inferenceJob?.id) {
            await this.inferenceJobService.updateInferenceJob(inferenceJob.id, {
                convertedPath: converted.data.convertedPath,
                fileSize: converted.data.fileSize,
                previewUrl: `http://localhost:3000/uploads/${
                    converted.data.convertedPath.split("/uploads/")[1]
                }`,
            });
        }
    }
}
