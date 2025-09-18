
import {IUser} from "../../domain/entities/User";
export interface IUserRepository { 
getAlluserbysort(search?: string): Promise<{ users:IUser[] }> 
userLogin(email: string, password: string): Promise<IUser>;
usergoogleLogin(credential:string):Promise<IUser>;


}