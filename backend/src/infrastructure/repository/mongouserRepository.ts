import {UserRepository} from "../../domain/repository/user-repository";
import { IBaseRepository } from '../../domain/repository/base-repository';
import {Iuser} from "../../domain/entities/user";
import {User} from "../database/models/user";
import {UserDTO} from '../../dto/user.dto'

export class MongoUserRepository implements UserRepository {
 
async getAlluser(
  page: number,
  limit: number,
  search: string | undefined,
  
): Promise<{ users: UserDTO[]; total: number }> {
  try {

    const baseFilter: any = {};

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
       const users: UserDTO[] = userDocs.map(doc => ({
      _id: doc._id.toString(),
      firstname: doc.firstname,
      lastname: doc.lastname,
      email: doc.email,
      phone: doc.phone ?? null,
      isBlocked:doc.isBlocked,
      gender: doc.gender,
      age: doc.age,
    }));
     return{ users, total:users.length };
    }
    const skip = (page - 1) * limit;

    
    const userDocs = await User.find(baseFilter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await User.countDocuments(baseFilter);

    const users: UserDTO[] = userDocs.map(doc => ({
      _id: doc._id.toString(),
      firstname: doc.firstname,
      lastname: doc.lastname,
      email: doc.email,
      phone: doc.phone ?? null,
      isBlocked:doc.isBlocked,
      gender: doc.gender,
      age: doc.age,
    }));
    return { users, total };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}


async getAlluserbysort(search?: string): Promise<{ users: UserDTO[]; total: number }> {
  try {
    const baseFilter: any = { isBlocked: false };

    if (search && search.trim() !== '') {
      baseFilter.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const userDocs = await User.find(baseFilter).sort({ lastMessage: -1 });
    const total = userDocs.length;

    const users: UserDTO[] = userDocs.map(doc => ({
      _id: doc._id.toString(),
      firstname: doc.firstname,
      lastname: doc.lastname,
      email: doc.email,
      phone: doc.phone ?? null,
      isBlocked: doc.isBlocked,
      gender: doc.gender,
      age: doc.age,
    }));

    return { users, total };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}


 async changeStatus(id: string): Promise<UserDTO[]> {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.isBlocked = !user.isBlocked;
        await user.save();
        const users = await User.find({});
        const userDTOs: UserDTO[] = users.map((u) => ({
            id: u._id.toString(),
            firstname: u.firstname,
            lastname: u.lastname,
            email: u.email,
            phone: u.phone ?? null,
            googleVerified: u.googleVerified,
            isBlocked: u.isBlocked,
            gender: u.gender,
            age: u.age,
        }));

        return userDTOs;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}



async getsingleuser(id: string): Promise<UserDTO> {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    const userDTO: UserDTO = {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      age: user.age,
    };

    return userDTO;
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