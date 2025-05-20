import{Iuser} from "../entities/user"

export interface UserRepository { 
getAlluser():Promise<Iuser[]>
changeStatus(id:string):Promise<Iuser[]>
getsingleuser(id:string):Promise<Iuser>
updatesingleuser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"):Promise<Iuser>



}