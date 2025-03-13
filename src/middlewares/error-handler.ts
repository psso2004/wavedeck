// src/middleware/ErrorHandler.ts
import { NextFunction, Request, Response } from "express";

export class ErrorHandler {
    public static handleErrors(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                message: "Validation error",
                details: err.error.details,
            });
            return;
        }

        console.error("Unhandled error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
