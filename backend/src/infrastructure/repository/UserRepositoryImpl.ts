import {IUserRepository} from "../../domain/repository/UserRepository";
import {Iuser} from "../../domain/entities/User";
import {User} from "../database/models/user";


import { FilterQuery } from "mongoose";
export class MongoUserRepository implements IUserRepository {
 
async getAlluser(
  page: number,
  limit: number,
  search: string | undefined,
  
): Promise<{ users:Iuser[]}> {
  try {

     const baseFilter: FilterQuery<Iuser> = {};

    if (search && search.trim() !== '') {
      baseFilter.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if(page===0&&limit===0)
    {
      const userDocs = await User.find(baseFilter)
    
     return{ users:userDocs};
    }
    const skip = (page - 1) * limit;

    
    const userDocs = await User.find(baseFilter)
      .skip(skip)
      .limit(limit)
      .exec();

     await User.countDocuments(baseFilter)
    return { users:userDocs};
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}


async getAlluserbysort(search?: string): Promise<{ users: Iuser[]}> {
  try {
    const baseFilter: FilterQuery<Iuser> = { isBlocked: false };

    if (search && search.trim() !== '') {
      baseFilter.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const userDocs = await User.find(baseFilter).sort({ lastMessage: -1 });

    return { users:userDocs};
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}


 async changeStatus(id: string): Promise<string> {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.isBlocked = !user.isBlocked;
        await user.save();
       return "status changed"
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}



async getsingleuser(id: string): Promise<Iuser> {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }   
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

    
    async updatesingleuser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"):Promise<string>{
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
                    return 'Profile updated'
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