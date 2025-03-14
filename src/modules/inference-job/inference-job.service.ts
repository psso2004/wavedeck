import { inject, injectable } from "inversify";
import { CreationAttributes, FindOptions, Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { IOC_TYPE } from "../../types/ioc.type";
import InferenceJob from "./models/inference-job.model";

@injectable()
export class InferenceJobService {
    constructor(
        @inject(IOC_TYPE.Sequelize) private readonly sequelize: Sequelize
    ) {}

    public createInferenceJob(
        createData: Partial<CreationAttributes<InferenceJob>>,
        transaction: Transaction | null = null
    ): Promise<InferenceJob> {
        const repo = this.sequelize.getRepository(InferenceJob);
        const inferenceJob = repo.build(
            createData as CreationAttributes<InferenceJob>
        );

        return inferenceJob.save({ transaction });
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
}
