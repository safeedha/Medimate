import { BaseRepository } from './BaseRepositoryImpl';
import {IUserRepository} from "../../domain/repository/UserRepository"
import { IUser } from '../../domain/entities/User';
import { User } from '../database/models/user';
import { FilterQuery } from 'mongoose';
import bcrypt from 'bcrypt'
import { jwtDecode } from "jwt-decode";
import { DecodedGoogleToken} from '../../domain/entities/Googletoken'

export class MongoUserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super();
  }

  async create(data:IUser): Promise<void>
   {
      try {
        const mail = data.email;
        const phone = data.phone;
        const existingPhone = await User.findOne({ phone: phone });
        if (existingPhone) {
          throw new Error('User with this phone number already exists');
        }
        const existingUser = await User.findOne({ email: mail });
       if (existingUser) {
        if (existingUser.password) {
          throw new Error('Email is already registered');
        }
        else{
           existingUser.firstname=data.firstname
           existingUser.lastname=data.lastname
           existingUser.phone=data.phone
           existingUser.isBlocked =data.isBlocked
           existingUser.gender=data.gender
           await existingUser.save()
        }
      }
      else{
        const newUser = new User(data);
        await newUser.save()
      }
  
      }
      catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Unexpected error occurred during user registration');
      }
    }

    async usergoogleLogin(credential: string): Promise<IUser> {
      try {
        const decoded = jwtDecode<DecodedGoogleToken>(credential);
        let user = await User.findOne({ email: decoded?.email });
    
        if (!user) {
          user = new User();
          user.googleIds = decoded?.sub;
          user.firstname = decoded.name?.split(" ")[0] || "";
          user.lastname = decoded.name?.split(" ").slice(1).join(" ") || "";
          user.googleVerified = true;
          user.email = decoded.email;
          await user.save();
        } else {
          if (user.isBlocked) {
            throw new Error("This account is blocked");
          }
          user.googleIds = decoded?.sub;
          await user.save();
        }
    
        const loggedInUser = await User.findOne({ googleIds: decoded?.sub });
    
        if (!loggedInUser) {
          throw new Error("User creation failed");
        }
    
         return loggedInUser
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Unexpected error occurred during user login");
      }
    }


    async userLogin(email: string, password: string): Promise<IUser> {
      try {
        const user = await User.findOne({ email: email });
    
        if (!user) {
          throw new Error("This email is not registered");
        }
    
        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }
    
        if (user.isBlocked) {
          throw new Error("This account is blocked");
        }
    
        if (!user.googleVerified) {
          throw new Error("This account is not verified");
        }
          return user
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Unexpected error occurred during user login");
      }
    }
    

  async findAll(
    page: number,
    limit: number,
    search?: string
  ): Promise< IUser[] > {
    try {
      const baseFilter: FilterQuery<IUser> = {};

      if (search && search.trim() !== '') {
        baseFilter.$or = [
          { firstname: { $regex: search, $options: 'i' } },
          { lastname: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      if (page === 0 && limit === 0) {
        const userDocs = await User.find(baseFilter);
        return userDocs ;
      }

      const skip = (page - 1) * limit;

      const userDocs = await User.find(baseFilter)
        .skip(skip)
        .limit(limit)
        .exec();

      await User.countDocuments(baseFilter);

      return userDocs;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }

  async getAlluserbysort(search?: string): Promise<{ users: IUser[] }> {
    try {
      const baseFilter: FilterQuery<IUser> = { isBlocked: false };

      if (search && search.trim() !== '') {
        baseFilter.$or = [
          { firstname: { $regex: search, $options: 'i' } },
          { lastname: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      const userDocs = await User.find(baseFilter).sort({ lastMessage: -1 });

      return { users: userDocs };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.isBlocked = !user.isBlocked;
      await user.save();
      return "status changed";
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async findById(id: string): Promise<IUser> {
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

  async update(
    id: string,
    data:Partial<IUser>
  ): Promise<string> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      const existingUser = await User.findOne({
        phone: data.phone,
        _id: { $ne: id }
      });

      if (existingUser) {
        throw new Error("This phone number already exists");
      }

     user.firstname = data.firstname ?? user.firstname;
      user.lastname = data.lastname;
     user.phone = data.phone ?? user.phone;
      user.age = data.age;
      user.gender = data.gender;

      await user.save();
      return 'Profile updated';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
