import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreationAttributes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { IOC_TYPE } from "../../types/ioc.type";
import RequestLog from "./models/request-log.model";

@injectable()
export class RequestLogService {
    constructor(
        @inject(IOC_TYPE.Sequelize)
        private readonly sequelize: Sequelize
    ) {}

    public createRequestLog(
        createData: Partial<CreationAttributes<RequestLog>>
    ): Promise<RequestLog> {
        const repo = this.sequelize.getRepository(RequestLog);
        const audioFile = repo.build(
            createData as CreationAttributes<RequestLog>
        );

        return audioFile.save();
    }

    public async logRequest(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4();

        res.on("finish", async () => {
            try {
                await this.createRequestLog({
                    requestId,
                    userId: req.body.userId || null,
                    endpoint: req.originalUrl,
                    payload: JSON.stringify(req.body) || null,
                    response: JSON.stringify(res.locals.responseData) || null,
                    statusCode: res.statusCode,
                    message: res.statusMessage || null,
                });
            } catch (error) {
                console.error("error logging request:", error);
            }
        });

        next();
    }
}
