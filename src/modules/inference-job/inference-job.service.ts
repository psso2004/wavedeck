import { Queue } from "bullmq";
import { inject, injectable } from "inversify";
import { CreationAttributes, FindOptions, Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { IOC_TYPE } from "../../types/ioc.type";
import AudioFileInferenceJob from "../audio-file/models/audio-file-inference-job.model";
import InferenceJob from "./models/inference-job.model";

@injectable()
export class InferenceJobService {
    constructor(
        @inject(IOC_TYPE.Sequelize) private readonly sequelize: Sequelize,
        @inject(IOC_TYPE.InferenceJobQueue)
        private readonly inferenceJobQueue: Queue
    ) {}

    public createInferenceJob(
        createData: Partial<CreationAttributes<InferenceJob>>,
        transaction: Transaction | null = null
    ): Promise<InferenceJob> {
        console.log(createData);
        const repo = this.sequelize.getRepository(InferenceJob);

        const saveInclude =
            (createData.audioFileInferenceJobs ?? []).length > 0
                ? {
                      include: [AudioFileInferenceJob],
                  }
                : {};
        return repo.create(createData as CreationAttributes<InferenceJob>, {
            transaction,
            ...saveInclude,
        });
    }

    public updateInferenceJob(
        id: number,
        updateData: Partial<CreationAttributes<InferenceJob>>,
        transaction: Transaction | null = null
    ): Promise<[number, InferenceJob[]]> {
        const repo = this.sequelize.getRepository(InferenceJob);
        return repo.update(updateData, {
            where: { id },
            transaction,
            returning: true,
        });
    }

    public getInferenceJob(
        options: FindOptions<InferenceJob>
    ): Promise<InferenceJob | null> {
        const repo = this.sequelize.getRepository(InferenceJob);
        return repo.findOne(options);
    }

    public getInferenceJobById(id: number): Promise<InferenceJob | null> {
        const repo = this.sequelize.getRepository(InferenceJob);
        return repo.findByPk(id);
    }

    public async addJobQueue(data: InferenceJob): Promise<void> {
        const job = await this.inferenceJobQueue.add("inferenceJob", data);
        await this.updateInferenceJob(data.id, {
            queue_position: Number(job.id),
        });
    }
}
