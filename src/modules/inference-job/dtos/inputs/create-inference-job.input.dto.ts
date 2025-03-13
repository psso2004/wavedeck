import Joi from "joi";

export class CreateInferenceJobInputDto {
    userId: number;
    audioFileId: number;
    voiceId: number;
    pitch: number;

    constructor(
        userId: number,
        audioFileId: number,
        voiceId: number,
        pitch: number
    ) {
        this.userId = userId;
        this.audioFileId = audioFileId;
        this.voiceId = voiceId;
        this.pitch = pitch;
    }

    static schema = Joi.object({
        userId: Joi.number().integer().required(),
        audioFileId: Joi.number().integer().required(),
        voiceId: Joi.number().integer().required(),
        pitch: Joi.number().integer().required(),
    });

    static create(input: any): CreateInferenceJobInputDto {
        return new CreateInferenceJobInputDto(
            input.userId,
            input.audioFileId,
            input.voiceId,
            input.pitch
        );
    }
}
