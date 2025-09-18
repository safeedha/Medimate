import {IRegistrationRepository} from "../../../domain/repository/RegistrationRepository";
import { IDoctorReapply } from '../../../domain/useCaseInterface/auth/IDoctorReapply';
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
export class DocReapply implements IDoctorReapply{

 constructor(private _docRepository:IDoctorRepository){}
 async docreapply(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<{message:string}>
 {
   try{
        await this._docRepository.docReaplly(email,specialisation,experience,fee,medicalLicence)
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