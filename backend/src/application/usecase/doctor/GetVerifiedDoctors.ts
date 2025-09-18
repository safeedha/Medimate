
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IGetVerifiedDoctors} from "../../../domain/useCaseInterface/doctor/IGetVerifiedDoctors"

export class FetchVerifiedDoctor implements IGetVerifiedDoctors{

  constructor(private _doctorRepository: IDoctorRepository) {}
  async getAllVerifiedDoctors(page:number,limit:number,department?: string,search?:string,experience?:string): Promise<{ total: number; data: DoctorDTO[] }> {
    try {
      const {data,total} = await this._doctorRepository.getAllverified(page,limit,department,search,experience);
     const doctors: DoctorDTO[] = data.map((doc) => ({
      _id: doc._id!.toString(),
      firstname: doc.firstname,
      lastname: doc.lastname,
      email: doc.email,
      phone: doc.phone,
      specialisation: doc.specialisation && typeof doc.specialisation === 'object'
        ? {
         
            deptname: doc.specialisation.deptname,
            description: doc.specialisation.description,
          }
        : doc.specialisation?.toString() ?? null,
      experience: doc.experience,
      fee: doc.fee,
      profilePicture: doc.profilePicture,
    }));
      return {data:doctors,total};
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}