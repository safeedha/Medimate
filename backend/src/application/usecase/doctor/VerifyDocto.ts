import { IDoctorRepository } from '../../../domain/repository/DoctorRepository';
import { sendMail } from '../../service/emailservice';
import { DoctorDTO } from '../../../dto/doctor.dto';
import { IVerifyDoctor } from '../../../domain/useCaseInterface/doctor/IVerifyDoctor';

export class VerifyDoctor implements IVerifyDoctor {
  constructor(private docRepository: IDoctorRepository) {}

  async verifyStatus(id: string, status: 'Approved' | 'Rejected', reason?: string): Promise<DoctorDTO[]> {
    try {
      
      if (reason) {
        const doctor = await this.docRepository.getSingleDoctor(id);
        if (!doctor) {
          throw new Error("Doctor not found");
        }

        await sendMail(
          doctor.email,
          undefined, 
          'Application Rejected',
          reason
        );
      }

      const users = await this.docRepository.verification(id, status);

    
      return users.map((doc): DoctorDTO => ({
        _id: doc._id?.toString(),
        firstname: doc.firstname,
        lastname: doc.lastname,
        email: doc.email,
        phone: doc.phone,
        specialisation: doc.specialisation,
        experience: doc.experience,
        fee: doc.fee,
        qualification: doc.qualification,
        additionalInfo: doc.additionalInfo,
        profilePicture: doc.profilePicture,
        medicalLicence: doc.medicalLicence,
      }));
    } catch (error) {
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
