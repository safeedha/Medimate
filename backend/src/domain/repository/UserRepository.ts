
import {Iuser} from "../../domain/entities/User";
export interface IUserRepository { 
getAlluser(page:number,limit:number,search:string):Promise<{ users: Iuser[]}>
changeStatus(id:string):Promise<string>
getsingleuser(id:string):Promise<Iuser>
updatesingleuser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"):Promise<string>
getAlluserbysort(search?: string): Promise<{ users:Iuser[] }> 



}