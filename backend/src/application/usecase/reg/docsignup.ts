import {RegRepository } from "../../../domain/repository/reg-repository";
import { Idoctor } from "../../../domain/entities/doctor";
export class DocRegister{

 constructor(private regRepository:RegRepository){}
  async signup(data:{firstname:string,lastname:string,email:string,phone:string,specialisation:string|null,experience:number,fee:number,password:string,additionalInfo?:string,profilePicture?:string,medicalLicence?:string}):Promise<{ message: string }> 
  {
     try{
        const newdata:Idoctor={
          firstname:data.firstname,
          lastname:data.lastname,
          email:data.email,
          password:data.password,
          phone:data.phone,
          specialisation:data.specialisation,
          experience:data.experience,
          fee:data.fee,
           status:"Pending",
          isBlocked:false,
          additionalInfo:data.additionalInfo,
          profilePicture:data.profilePicture,
          medicalLicence:data.medicalLicence
        }
         await this.regRepository.docRegister(newdata);
          return { message: "Doctor registered successfully" };
     }
     catch(error){
        if (error instanceof Error) {
         throw new Error(error.message); 
      }
      throw new Error('Unexpected error occurred during doctor registration');
     }
  }
}