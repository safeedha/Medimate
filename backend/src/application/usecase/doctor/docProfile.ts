import {DoctorRepository} from '../../../doamin/repository/doctor-repository';
import {Idoctor} from '../../../doamin/entities/doctor';

export class Docprofile {

  constructor(private docRepository: DoctorRepository) {}
  async updateprofile(firstname:string,lastname:string,experience:number,fee:number,image:string,email:string,phone:string): Promise<{message:string}> {
    try {
      const update = await this.docRepository.profileupdate(firstname,lastname,experience,fee,image,email,phone);
      return {message:"updated"}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}