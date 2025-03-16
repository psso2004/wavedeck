import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import { IOC_TYPE } from "../../types/ioc.type";
import User from "./models/user.model";

@injectable()
export class UserService {
    constructor(
        @inject(IOC_TYPE.Sequelize) private readonly sequelize: Sequelize
    ) {}

    public getUserById(id: number): Promise<User | null> {
        const repo = this.sequelize.getRepository(User);
        return repo.findByPk(id);
    }

    public getUsers(): Promise<User[]> {
        const repo = this.sequelize.getRepository(User);
        return repo.findAll();
    }
}
