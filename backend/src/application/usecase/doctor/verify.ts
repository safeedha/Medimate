import {DoctorRepository} from '../../../doamin/repository/doctor-repository';
import {Idoctor} from '../../../doamin/entities/doctor';


export class VerifyDoctor {
  constructor(private docRepository: DoctorRepository) {}

 async verifyStatus(id: string, status: 'Approved' | 'Rejected'): Promise<Idoctor[]> {
   try{
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