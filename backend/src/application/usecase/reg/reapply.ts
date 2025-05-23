import {RegRepository } from "../../../domain/repository/reg-repository";
import { Idoctor } from "../../../domain/entities/doctor";

export class DocReapply{

 constructor(private regRepository:RegRepository){}
 async docreapply(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<{message:string}>
 {
   try{
        await this.regRepository.docReaplly(email,specialisation,experience,fee,medicalLicence)
        return {message:"Reapplication sucess"}
   }
   catch(error)
   {
         if (error instanceof Error) {
      throw new Error(error.message); 
    }
       throw new Error('Unexpected error occurred during otp verification');
   }
 }

}