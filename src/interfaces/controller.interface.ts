import { Router } from "express";

export interface IController {
    registerRoutes(router: Router): void;
}
