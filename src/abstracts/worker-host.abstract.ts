import { Job, Worker, WorkerOptions } from "bullmq";

export abstract class WorkerHost {
    protected _worker: Worker;

    constructor(queueName: string, workerOptions: Partial<WorkerOptions> = {}) {
        this._worker = new Worker(queueName, async (job) => this.process(job), {
            connection: {
                host: process.env.REDIS_HOST || "localhost",
                port: process.env.REDIS_PORT
                    ? parseInt(process.env.REDIS_PORT, 10)
                    : 6379,
            },
            ...workerOptions,
        });
    }

    abstract process(job: Job): Promise<any>;

    public get worker(): Worker {
        return this._worker;
    }
}
