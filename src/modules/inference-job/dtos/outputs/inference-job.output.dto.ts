import InferenceJob from "../../models/inference-job.model";

export class InferenceJobOutputDto {
    inferenceJobId: number;
    previewUrl: string;
    createdAt: Date;
    status: "processing" | "completed";

    constructor(
        inferenceJobId: number,
        previewUrl: string,
        createdAt: Date,
        status: "processing" | "completed"
    ) {
        this.inferenceJobId = inferenceJobId;
        this.previewUrl = previewUrl;
        this.createdAt = createdAt;
        this.status = status;
    }

    static fromModel(source: InferenceJob) {
        return new InferenceJobOutputDto(
            source.id,
            source.previewUrl || "",
            source.createdAt,
            source.convertedPath ? "completed" : "processing"
        );
    }
}
