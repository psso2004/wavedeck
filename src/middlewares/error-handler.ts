// src/middleware/ErrorHandler.ts
import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import multer from "multer";
import { DatabaseError } from "sequelize";

export class ErrorHandler {
    public static handleErrors(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (res.headersSent) {
            return next(err);
        }

        if (req.file) {
            fs.unlink(req.file.path);
        }

        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                message: "Validation error",
                details: err.error.details,
            });
            return next(err);
        }

        if (err instanceof multer.MulterError) {
            res.status(400).json({
                message: "File upload error",
                error: err.message,
            });
            return next(err);
        }

        if (err.status >= 400 && err.status < 500) {
            res.status(err.status).json({
                message: err.message || "Client Error",
            });
            return next(err);
        }

        if (err instanceof DatabaseError) {
            res.status(500).json({
                message: "Database error",
                error: err.message,
            });
            return next(err);
        }

        console.error("Unhandled error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
