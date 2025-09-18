import bcrypt from 'bcrypt';

import { IDoctor } from "../../../domain/entities/Doctor";
import { IDoctorRegister } from '../../../domain/useCaseInterface/auth/IDoctorRegister';
import { IBaseRepository } from '../../../domain/repository/BaseRepository' 
export class DocRegister implements IDoctorRegister{

 constructor(private _baseRepository: IBaseRepository<IDoctor>){}
  async signup(data:{firstname:string,lastname:string,email:string,phone:string,specialisation:string|null,experience:number,fee:number,password:string,additionalInfo?:string,profilePicture?:string,medicalLicence?:string}):Promise<{ message: string }> 
  {
     try{
          const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const newdata:IDoctor={
          firstname:data.firstname,
          lastname:data.lastname,
          email:data.email,
          password:hashedPassword,
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
         await this._baseRepository.create(newdata);
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