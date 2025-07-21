import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';
import {sendMail} from '../../../application/service/emailservice'
import {DoctorDTO} from '../../../dto/doctor.dto'
import { IVerifyDoctor } from '../../../domain/useCaseInterface/doctor/IVerifyDoctor';

export class VerifyDoctor implements IVerifyDoctor{
  constructor(private docRepository: DoctorRepository) {}

 async verifyStatus(id: string, status: 'Approved' | 'Rejected',reason?:string): Promise<DoctorDTO[]> {
   try{

       if(reason)
       {
       const doctor = await this.docRepository.getSingleDoctor(id);
        console.log(doctor)
       await sendMail(doctor.email, undefined, 'Application Rejected', reason);


       }
      const users = await this.docRepository.verification(id, status);
      return users;
   }
   catch(error){
        if (error instanceof Error) {
          console.error('Error verifying doctor:', error.message);
          throw new Error(error.message);
        } else {
          console.error('Error verifying doctor:', error);
          throw new Error('An unknown error occurred');
        }
   }
 }
}