import { injectable } from "inversify";

// todo: test service
@injectable()
export class UserService {
    public getUser() {
        return [{ id: 1, name: "test" }];
    }
}
