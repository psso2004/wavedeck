import InferenceJob from "../../models/inference-job.model";

export class InferenceJobOutputDto {
    inferenceJobId: number;
    previewUrl: string;
    createdAt: Date;

    constructor(inferenceJobId: number, previewUrl: string, createdAt: Date) {
        this.inferenceJobId = inferenceJobId;
        this.previewUrl = previewUrl;
        this.createdAt = createdAt;
    }

    static fromModel(source: InferenceJob) {
        return new InferenceJobOutputDto(
            source.id,
            source.previewUrl || "",
            source.createdAt
        );
    }
}
