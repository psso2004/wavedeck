import Joi from "joi";

export class GetAudioFileQueryDto {
    userId: number;
    audioFileId: number;

    constructor(userId: number, audioFileId: number) {
        this.userId = userId;
        this.audioFileId = audioFileId;
    }

    static schema = Joi.object({
        userId: Joi.number().integer().required(),
        audioFileId: Joi.number().integer().required(),
    });

    static create(input: any): GetAudioFileQueryDto {
        return new GetAudioFileQueryDto(input.userId, input.audioFileId);
    }
}
