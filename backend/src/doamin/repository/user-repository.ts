import{Iuser} from "../entities/user"

export interface UserRepository {
getAlluser():Promise<Iuser[]>
changeStatus(id:string):Promise<Iuser[]>



}