import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { injectable } from "inversify";
import multer, { Multer, StorageEngine } from "multer";
import path from "path";

@injectable()
export class MulterProvider {
    private upload: Multer;

    constructor() {
        const storage: StorageEngine = multer.diskStorage({
            destination: (_req, _file, cb) => {
                const uploadPath = path.join(__dirname, "/../../uploads");

                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            },
            filename: (_req, file, cb) => {
                cb(
                    null,
                    `${Date.now()}-${Math.round(Math.random() * 1000000000)}-${
                        file.originalname
                    }`
                );
            },
        });

        this.upload = multer({ storage });
    }

    public single(fieldName: string) {
        return this.upload.single(fieldName);
    }

    public singleAndMerge(fieldName: string) {
        return (req: Request, res: Response, next: NextFunction) =>
            this.upload.single(fieldName)(req, res, (err: any) => {
                if (err) {
                    return next(err);
                }

                req.body.file = req.file;

                next();
            });
    }
}
