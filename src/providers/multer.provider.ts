import { NextFunction, Request, Response } from "express";
import fs from "fs";
import createHttpError from "http-errors";
import { injectable } from "inversify";
import multer, { Multer, StorageEngine } from "multer";
import path from "path";

@injectable()
export class MulterProvider {
    private upload: Multer;

    constructor() {
        const storage: StorageEngine = multer.diskStorage({
            destination: (_req, _file, next) => {
                const uploadPath = path.join(__dirname, "/../../uploads");

                fs.mkdirSync(uploadPath, { recursive: true });
                next(null, uploadPath);
            },
            filename: (_req, file, next) => {
                next(
                    null,
                    `${Date.now()}-${Math.round(Math.random() * 1000000000)}-${
                        file.originalname
                    }`
                );
            },
        });

        this.upload = multer({
            storage,
            fileFilter: (req, file, next) => {
                const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
                if (allowedTypes.includes(file.mimetype)) {
                    next(null, true);
                } else {
                    next(createHttpError.BadRequest("invalid file type"));
                }
            },
            limits: {
                fileSize: 10 * 1024 * 1024,
            },
        });
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
