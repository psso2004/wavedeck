import Joi from "joi";

export class DeleteAudioFileInputDto {
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

    static create(input: any): DeleteAudioFileInputDto {
        return new DeleteAudioFileInputDto(input.userId, input.audioFileId);
    }
}
