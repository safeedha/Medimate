import {UserRepository} from "../../doamin/repository/user-repository";
import {Iuser} from "../../doamin/entities/user";
import {User} from "../database/models/user";

export class MongoUserRepository implements UserRepository {
    async getAlluser(): Promise<Iuser[]> {
        return await User.find({});
    }

    async changeStatus(id: string): Promise<Iuser[]> {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            user.isBlocked = !user.isBlocked;
            await user.save();
            return await User.find({});
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    
}