import { Request, Response, Router } from "express";
import createHttpError from "http-errors";
import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { JoiValidatorProvider } from "../../providers/validator.provider";
import { IOC_TYPE } from "../../types/ioc.type";
import { AudioFileService } from "../audio-file/audio-file.service";
import { CreateInferenceJobInputDto } from "./dtos/inputs/create-inference-job.input.dto";
import { InferenceJobOutputDto } from "./dtos/outputs/inference-job.output.dto";
import { GetInferenceJobQueryDto } from "./dtos/queries/get-inference-job.query.dto";
import { InferenceJobService } from "./inference-job.service";

@injectable()
export class InferenceJobController implements IController {
    constructor(
        @inject(IOC_TYPE.JoiValidator)
        private readonly joiValidator: JoiValidatorProvider,
        @inject(IOC_TYPE.InferenceJobService)
        private readonly inferenceJobService: InferenceJobService,
        @inject(IOC_TYPE.AudioFileService)
        private readonly audioFileService: AudioFileService
    ) {}

    public registerRoutes(router: Router): void {
        router.post(
            "/inference/sts",
            this.joiValidator.getValidatorBody(
                CreateInferenceJobInputDto.schema
            ),
            (req, res) => this.createInferenceJob(req, res)
        );

        router.get(
            "/inference/sts",
            this.joiValidator.getValidatorQuery(GetInferenceJobQueryDto.schema),
            (req, res) => this.getInferenceJob(req, res)
        );
    }

    private async createInferenceJob(
        req: Request,
        res: Response
    ): Promise<InferenceJobOutputDto> {
        const dto = CreateInferenceJobInputDto.create(req.body);

        const audioFile = await this.audioFileService.getAudioFile({
            where: {
                id: dto.audioFileId,
                userId: dto.userId,
            },
        });
        if (!audioFile) throw createHttpError.NotFound("not found audiofile");

        const inferenceJob = await this.inferenceJobService.createInferenceJob(
            Object.assign(dto, {
                originalPath: audioFile?.filePath,
                audioFileInferenceJobs: [
                    {
                        audioFileId: audioFile.id,
                    } as any,
                ],
            })
        );

        await this.inferenceJobService.addJobQueue(inferenceJob);

        const output: InferenceJobOutputDto =
            InferenceJobOutputDto.fromModel(inferenceJob);

        res.json(output);
        return output;
    }

    private async getInferenceJob(
        req: Request,
        res: Response
    ): Promise<InferenceJobOutputDto> {
        const dto = GetInferenceJobQueryDto.create(req.query);

        const { inferenceJobId } = dto;
        const inferenceJob = await this.inferenceJobService.getInferenceJobById(
            inferenceJobId
        );
        if (!inferenceJob) {
            throw createHttpError.NotFound("not found inferenceJob");
        }

        const output: InferenceJobOutputDto =
            InferenceJobOutputDto.fromModel(inferenceJob);

        res.json(output);
        return output;
    }
}
