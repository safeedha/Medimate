import{Idoctor} from "../entities/doctor"

export interface DoctorRepository {
getAllunverified():Promise<Idoctor[]>
getAllverified(department?: string,search?:string):Promise<Idoctor[]>
changeStatus(id:string):Promise<Idoctor[]>
verification(id:string,stataus:"Approved"|"Rejected"):Promise<Idoctor[]>
profileupdate(firstname:string,lastname:string,experience:number,fee:number,image:string,email:string,phone:string,specialisation:string,qualification:string):Promise<{message:string}>
getSingleDoctor(id:string):Promise<Idoctor>
}