import {UserRepository} from "../../domain/repository/user-repository";
import {Iuser} from "../../domain/entities/user";
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
    async getsingleuser(id:string): Promise<Iuser> {
       try{
           const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user
       }
       catch(error)
       {
          if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
       }
    }
    
    async updatesingleuser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"):Promise<Iuser>{
        try{
               const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const existingUser = await User.findOne({
                phone: phone,
                _id: { $ne: id }  
                });
                if(existingUser)
                {
                         throw new Error("This Phone number already found");
                }
                    user.firstname=firstname
                    user.lastname=lastname
                    user.phone=phone
                    user.age=age
                    user.gender=gender
                    await user.save();
                    return user
        }
        catch(error)
        {
           if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }


    
}