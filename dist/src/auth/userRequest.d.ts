import { Request } from "express";
import { User } from "src/Entities/userEntity.entity";
export interface RequestWithUser extends Request {
    user: User;
}
