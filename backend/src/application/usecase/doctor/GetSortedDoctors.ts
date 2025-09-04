
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IGetSortedDoctors} from "../../../domain/useCaseInterface/doctor/IGetSortedDoctors"

export class FetchSortedDoctors implements IGetSortedDoctors {
  constructor(private doctorRepository: IDoctorRepository) {}

  async getAllDoctors(search: string): Promise<{ data: DoctorDTO[]; total: number }> {
    try {
      const {data,total} = await this.doctorRepository.getAllverifiedbysort(search);
       const mapeddata: DoctorDTO[] = data.map((doc) => ({
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
      return {data:mapeddata,total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}