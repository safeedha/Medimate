import { IDoctorRepository } from '../../domain/repository/DoctorRepository';
import { Doctor } from '../database/models/docter';
import { IDoctor, IExperience } from '../../domain/entities/Doctor';
import { FilterQuery } from 'mongoose';
import { BaseRepository } from './BaseRepositoryImpl';
import bcrypt from 'bcrypt'

export class MongoDocRepository
  extends BaseRepository<IDoctor>
  implements IDoctorRepository
{
  async getAllunverified(
    page: number,
    limit: number
  ): Promise<{ doctors: IDoctor[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const total = await Doctor.countDocuments({ status: 'Pending' });

      const doctors = await Doctor.find({ status: 'Pending' })
        .skip(skip)
        .limit(limit)
        .populate('specialisation');

      return {
        doctors,
        total,
      };
    } catch (error) {
      console.error('Error fetching unverified doctors:', error);
      throw new Error('Database error');
    }
  }

  async getAllverified(
    page: number,
    limit: number,
    department?: string,
    search?: string,
    experience?: string
  ): Promise<{ total: number; data: IDoctor[] }> {
    try {
      let doctors = await Doctor.find({ status: 'Approved', isBlocked: false }).populate({
        path: 'specialisation',
        match: { isblocked: false },
      });

      if (department && department !== 'All doctor') {
        doctors = doctors.filter(
          (doc) =>
            typeof doc.specialisation === 'object' &&
            doc?.specialisation?.deptname === department
        );
      }

      if (search) {
        doctors = doctors.filter((doc) =>
          doc.firstname.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (experience) {
        doctors = doctors.filter((doc) => doc.experience >= Number(experience));
      }

      const total = doctors.length;

      if (page === 0 && limit === 0) {
        return { total, data: doctors };
      }

      const startIndex = (page - 1) * limit;
      const paginated = doctors.slice(startIndex, startIndex + limit);

      return { total, data: paginated };
    } catch (error) {
      console.error('Error fetching verified doctors:', error);
      throw new Error('Database error');
    }
  }

  async getAllverifiedbysort(
    search?: string
  ): Promise<{ total: number; data: IDoctor[] }> {
    try {
      let doctors = await Doctor.find({
        status: 'Approved',
        isBlocked: false,
      }).populate({
        path: 'specialisation',
        match: { isblocked: false },
      });

      if (search) {
        doctors = doctors.filter((doc) =>
          doc.firstname.toLowerCase().includes(search.toLowerCase())
        );
      }

      const total = doctors.length;

      doctors = doctors.sort(
        (a, b) =>
          new Date(b.lastMessage ?? 0).getTime() -
          new Date(a.lastMessage ?? 0).getTime()
      );

      return { total, data: doctors };
    } catch (error) {
      console.error('Error fetching verified doctors:', error);
      throw new Error('Database error');
    }
  }

  async findAll(
    page: number,
    limit: number,
    search?: string
  ): Promise<IDoctor[] > {
    try {
      const skip = (page - 1) * limit;
      const baseFilter: FilterQuery<IDoctor> = { status: 'Approved' };

      if (search && search.trim() !== '') {
        baseFilter.$or = [
          { firstname: { $regex: search, $options: 'i' } },
          { lastname: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      const doctorDocs = await Doctor.find(baseFilter)
        .populate({ path: 'specialisation' })
        .skip(skip)
        .limit(limit)
        .exec();

      const total = await Doctor.countDocuments(baseFilter);

      return  doctorDocs;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }

  async findById(id: string): Promise<IDoctor> {
    try {
      const doctor = await Doctor.findById(id).populate('specialisation');

      if (!doctor) {
        throw new Error('Doctor not found');
      }
      return doctor;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.isBlocked = !doctor.isBlocked;
      await doctor.save();

      return 'status changed';
    } catch (error) {
      console.error('Error changing doctor status:', error);
      throw new Error('Database error');
    }
  }

  async verification(
    id: string,
    status: 'Approved' | 'Rejected'
  ): Promise<IDoctor[]> {
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        throw new Error('Doctor not found');
      }

      doctor.status = status;
      await doctor.save();

      const pendingDoctors = await Doctor.find({ status: 'Pending' });
      return pendingDoctors;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error verifying doctor:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }
  async create(data: IDoctor): Promise<void>{
     try {
          console.log(data)
          const mail = data.email;
          const phone = data.phone;
          const existingPhone = await Doctor.findOne({ phone: phone });
          if (existingPhone) {
            throw new Error('Doctor with this phone number already exists');
          }
          const existingDoctor = await Doctor.findOne({ email: mail });
    
          if (existingDoctor) {
            throw new Error('Doctor with this email already exists');
          }
    
          const newDoctor = new Doctor(data);
          await newDoctor.save();    
          
        } catch (error) {
          if (error instanceof Error) {
          
            throw new Error(error.message); 
          }
        
          throw new Error('Unexpected error occurred during doctor registration');
        }
  }

    async docLogin(email: string, password: string): Promise<IDoctor> {
    try {
      const doctor = await Doctor.findOne({ email });
  
      if (!doctor) {
        throw new Error("This email is not registered");
      }
  
      const isMatch = await bcrypt.compare(password, doctor.password!);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
  
      if (doctor.status === "Rejected") {
        throw new Error("Your account is rejected by admin");
      }
  
      if (doctor.status === "Pending") {
        throw new Error("Your account is not approved yet, please contact admin");
      }
  
      if (doctor.googleVerified === false) {
        throw new Error("Your account is not verified");
      }
  
      if (doctor.isBlocked === true) {
        throw new Error("This account is blocked by admin, please contact admin");
      }
  
      return doctor
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during doctor login");
    }
  }
  
  async update(
    id: string,
    data:Partial<IDoctor>
  ): Promise< string > {
    try {
      const doctor = await Doctor.findOne({ _id: id });

      if (!doctor) {
        throw new Error('Doctor not found');
      }

      const existingDoctorWithPhone = await Doctor.findOne({
        phone: data.phone,
        _id: { $ne: id },
      });

      if (existingDoctorWithPhone) {
        throw new Error('Phone number already exists for another doctor');
      }

      let exp = 0;
      if (data!.experienceDetail!.length > 0) {
        exp =  data!.experienceDetail!.reduce((sum, exp) => {
          const years = parseInt(exp.years); // Convert string to number
          return sum + (isNaN(years) ? 0 : years);
        }, 0);
      }

     if (data.firstname !== undefined) doctor.firstname = data.firstname;
    if (data.lastname !== undefined) doctor.lastname = data.lastname;
    if (data.experience !== undefined) {
      doctor.experience = data.experience > exp ? data.experience : exp;
    }
    if (data.fee !== undefined) doctor.fee = data.fee;
    if (data.phone !== undefined) doctor.phone = data.phone;
    if (data.profilePicture !== undefined) doctor.profilePicture = data.profilePicture;
    if (data.qualification !== undefined) doctor.qualification = data.qualification;
    if (data.specialisation !== undefined) doctor.specialisation = data.specialisation;
      doctor.medicalLicence = data.medicalLicence;
      doctor.experienceDetail = data.experienceDetail;

      await doctor.save();
      return  'Profile updated successfully' ;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating profile:', error.message);
        throw new Error(error.message);
      }
      throw new Error('Unknown error occurred');
    }
  }

  
    async docReaplly(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<void>
    {
      try{
             const doctor= await Doctor.findOne({ email: email})
             if(!doctor)
             {
              throw new Error("This email not registered")
             }
             if(doctor.status!=='Rejected')
             {
               throw new Error("Only rejected mail can reapply")
             }
             doctor.status='Pending'
             doctor.specialisation=specialisation
             doctor.experience=experience
             doctor.fee=fee
             doctor.medicalLicence=medicalLicence
             await doctor.save()
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
