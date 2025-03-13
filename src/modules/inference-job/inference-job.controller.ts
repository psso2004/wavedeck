import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IController } from "../../interfaces/controller.interface";
import { JoiValidatorProvider } from "../../providers/validator.provider";
import { IOC_TYPE } from "../../types/ioc.type";
import { CreateInferenceJobInputDto } from "./dtos/inputs/create-inference-job.input.dto";
import { InferenceJobOutputDto } from "./dtos/outputs/inference-job.output.dto";
import { GetInferenceJobQueryDto } from "./dtos/queries/get-inference-job.query.dto";

@injectable()
export class InferenceJobController implements IController {
    constructor(
        @inject(IOC_TYPE.JoiValidator)
        private readonly joiValidator: JoiValidatorProvider
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
        const output: InferenceJobOutputDto = {} as InferenceJobOutputDto;

        res.json(output);
        return output;
    }

    private async getInferenceJob(
        req: Request,
        res: Response
    ): Promise<InferenceJobOutputDto> {
        const dto = GetInferenceJobQueryDto.create(req.query);
        const output: InferenceJobOutputDto = {} as InferenceJobOutputDto;

        res.json(output);
        return output;
    }
}
