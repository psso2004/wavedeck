import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { MulterProvider } from "../../providers/multer.provider";
import { JoiValidatorProvider } from "../../providers/validator.provider";
import { IOC_TYPE } from "../../types/ioc.type";
import { CreateAudioFileInputDto } from "./dtos/inputs/create-audio-file.input.dto";
import { DeleteAudioFileInputDto } from "./dtos/inputs/delete-audio-file.input.dto";
import { AudioFileOutputDto } from "./dtos/outputs/audio-file.output.dto";
import { GetAudioFileQueryDto } from "./dtos/queries/get-audio-file.query.dto";

@injectable()
export class AudioFileController implements IController {
    constructor(
        @inject(IOC_TYPE.JoiValidator)
        private readonly joiValidator: JoiValidatorProvider,
        @inject(IOC_TYPE.MulterProvider)
        private readonly multer: MulterProvider
    ) {}

    public registerRoutes(router: Router): void {
        router.post(
            "/upload/audio",
            this.multer.singleAndMerge("file"),
            this.joiValidator.getValidatorBody(CreateAudioFileInputDto.schema),
            (req, res) => this.createAudioFile(req, res)
        );

        router.delete(
            "/upload/audio",
            this.joiValidator.getValidatorBody(DeleteAudioFileInputDto.schema),
            (req, res) => this.deleteAudioFile(req, res)
        );

        router.get(
            "/upload/audio",
            this.joiValidator.getValidatorQuery(GetAudioFileQueryDto.schema),
            (req, res) => this.getAudioFile(req, res)
        );
    }

    private async createAudioFile(
        req: Request,
        res: Response
    ): Promise<AudioFileOutputDto> {
        const dto = CreateAudioFileInputDto.create(req.body);
        const output: AudioFileOutputDto = {} as AudioFileOutputDto;

        res.json(output);
        return output;
    }

    private async deleteAudioFile(req: Request, res: Response): Promise<void> {
        const dto = DeleteAudioFileInputDto.create(req.body);
        res.json({});
    }

    private async getAudioFile(
        req: Request,
        res: Response
    ): Promise<AudioFileOutputDto> {
        const dto = GetAudioFileQueryDto.create(req.query);
        const output: AudioFileOutputDto = {} as AudioFileOutputDto;

        res.json(output);
        return output;
    }
}
