import Joi from "joi";

export class GetInferenceJobQueryDto {
    inferenceJobId: number;

    constructor(inferenceJobId: number) {
        this.inferenceJobId = inferenceJobId;
    }

    static schema = Joi.object({
        inferenceJobId: Joi.number().integer().required(),
    });

    static create(input: any): GetInferenceJobQueryDto {
        return new GetInferenceJobQueryDto(input.inferenceJobId);
    }
}
