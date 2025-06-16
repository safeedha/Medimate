
import {UserDTO} from '../../dto/user.dto'

export interface UserRepository { 
getAlluser(page:number,limit:number,search:string):Promise<{ users: UserDTO[]; total: number }>
changeStatus(id:string):Promise<UserDTO[]>
getsingleuser(id:string):Promise<UserDTO>
updatesingleuser(id:string,firstname:string,lastname:string,phone:string,age:number,gender:"male"|"female"|"other"):Promise<string>



}