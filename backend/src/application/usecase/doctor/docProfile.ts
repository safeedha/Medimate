import {DoctorRepository} from '../../../domain/repository/doctor-repository';
import {Idoctor} from '../../../domain/entities/doctor';

export class Docprofile {

  constructor(private docRepository: DoctorRepository) {}
  async updateprofile(firstname:string,lastname:string,experience:number,fee:number,image:string,email:string,phone:string,specialisation:string,qualification:string,medicalLicence:string): Promise<{message:string,doctor:Idoctor}> {
    try {
      const update = await this.docRepository.profileupdate(firstname,lastname,experience,fee,image,email,phone,specialisation,qualification,medicalLicence);
      console.log(update)
      return update
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}