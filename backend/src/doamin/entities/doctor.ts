import {Department} from './departnment'


export interface Idoctor{
  _id?:string,
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  phone:string,
  specialisation:string|Department|null,
  experience:number,
  fee:number,
  status:"Approved"|"Rejected"|"Pending",
  isBlocked:boolean,
  googleVerified?:boolean,
  qualification?:string,
  additionalInfo?:string,
  profilePicture?:string,
  medicalLicence?:string


}