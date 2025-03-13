import Joi from "joi";

export class CreateAudioFileInputDto {
    userId: number;
    file: Express.Multer.File;
    fileName: string;
    fileSize: number;
    duration: number;

    constructor(
        userId: number,
        file: Express.Multer.File,
        fileName: string,
        fileSize: number,
        duration: number
    ) {
        this.userId = userId;
        this.file = file;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.duration = duration;
    }

    static schema = Joi.object({
        userId: Joi.number().integer().required(),
        file: Joi.required(),
        fileName: Joi.string().required(),
        fileSize: Joi.number().required(),
        duration: Joi.number().required(),
    });

    static create(input: any): CreateAudioFileInputDto {
        return new CreateAudioFileInputDto(
            input.userId,
            input.file,
            input.fileName,
            input.fileSize,
            input.duration
        );
    }
}
