import * as express from "express";
import { createValidator, ExpressJoiInstance } from "express-joi-validation";
import { injectable } from "inversify";
import { ObjectSchema } from "joi";

@injectable()
export class JoiValidatorProvider {
    private validator: ExpressJoiInstance;

    constructor() {
        this.validator = createValidator({ passError: true });
    }

    public getValidator(): ExpressJoiInstance {
        return this.validator;
    }

    public getValidatorBody(
        objectSchema: ObjectSchema
    ): express.RequestHandler {
        return this.validator.body(objectSchema);
    }

    public getValidatorQuery(
        objectSchema: ObjectSchema
    ): express.RequestHandler {
        return this.validator.query(objectSchema);
    }
}
