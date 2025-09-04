import {IDoctorRepository} from '../../domain/repository/DoctorRepository';
import {Doctor} from '../database/models/docter';
import {Idoctor,IExperience} from '../../domain/entities/Doctor';
import { FilterQuery } from 'mongoose';


export class MongoDocRepository implements IDoctorRepository {
 async getAllunverified(
  page: number,
  limit: number
): Promise<{ doctors: Idoctor[]; total: number }> {
  try {
    const skip = (page - 1) * limit;
    const total = await Doctor.countDocuments({ status: 'Pending' });

    const doctors = await Doctor.find({ status: 'Pending' })
      .skip(skip)
      .limit(limit)
      .populate('specialisation');

    return {
      doctors: doctors,
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
  experience?:string
): Promise<{ total: number; data: Idoctor[] }> {
  try {
  
    let doctors = await Doctor.find({ status: 'Approved', isBlocked: false }).populate({
      path: 'specialisation',
      match: { isblocked: false },
    });


    if (department && department !== 'All doctor') {
      doctors = doctors.filter((doc) =>
        typeof doc.specialisation === 'object' &&
        doc?.specialisation?.deptname === department
      );
    }
    if (search) {
      doctors = doctors.filter((doc) =>
        doc.firstname.toLowerCase().includes(search.toLowerCase())
      );
    }
     if(experience)
     {
       doctors = doctors.filter(doc =>doc.experience >= Number(experience))
     }
      const total = doctors.length;
     if(page===0&&limit===0)
     {
     return { total, data:doctors };
     }
    const startIndex = (page - 1) * limit;
    const paginated = doctors.slice(startIndex, startIndex + limit);
   
    return { total, data:paginated };
  } catch (error) {
    console.error('Error fetching verified doctors:', error);
    throw new Error('Database error');
  }
}

 


async getAllverifiedbysort(
  search?: string
): Promise<{ total: number; data: Idoctor[] }> {
  try {
    let doctors = await Doctor.find({ status: 'Approved', isBlocked: false }).populate({
      path: 'specialisation',
      match: { isblocked: false },
    });
    if (search) {
      doctors = doctors.filter((doc) =>
        doc.firstname.toLowerCase().includes(search.toLowerCase())
      );
    }
      const total = doctors.length;
     
     doctors = doctors.sort((a, b) =>
      new Date(b.lastMessage ?? 0).getTime() - new Date(a.lastMessage ?? 0).getTime()
    );

     return { total, data:doctors };
  } catch (error) {
    console.error('Error fetching verified doctors:', error);
    throw new Error('Database error');
  }
}
 
  async getAlldoctor(
  page: number,
  limit: number,
  search: string | undefined
): Promise<{ doctors: Idoctor[]; total: number }> {
  try {
    const skip = (page - 1) * limit;
   const baseFilter: FilterQuery<Idoctor> = { status: 'Approved' };
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
    return { doctors: doctorDocs, total };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}



  async getSingleDoctor(id: string): Promise<Idoctor> {
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

async changeStatus(id: string): Promise<string> {
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    doctor.isBlocked = !doctor.isBlocked;
    await doctor.save();

    return "status changed"

  } catch (error) {
    console.error('Error changing doctor status:', error);
    throw new Error('Database error');
  }
}

 async verification(id: string, status: 'Approved' | 'Rejected'): Promise<Idoctor[]> {
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    doctor.status = status;
    await doctor.save();

    const pendingDoctors = await Doctor.find({ status: "Pending" });
     return pendingDoctors
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error verifying doctor:', error.message);
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}


async profileupdate(
  id: string,
  firstname: string,
  lastname: string,
  experience: number,
  fee: number,
  image: string,
  phone: string,
  specialisation: string,
  qualification: string,
  medicalLicence: string,
  experiencelist: IExperience[]
): Promise<{ message: string}> {
  try {
    const doctor = await Doctor.findOne({ _id: id });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const existingDoctorWithPhone = await Doctor.findOne({
      phone: phone,
      _id: { $ne: id },
    });

    if (existingDoctorWithPhone) {
      throw new Error('Phone number already exists for another doctor');
    }
    let exp=0
    if(experiencelist.length>0)
    {
           exp = experiencelist.reduce((sum, exp) => {
            const years = parseInt(exp.years); // Convert string to number
            return sum + (isNaN(years) ? 0 : years);
          }, 0);
    }

    doctor.firstname = firstname;
    doctor.lastname = lastname;
    doctor.experience = experience>exp?experience:exp;
    doctor.fee = fee;
    doctor.phone = phone;
    doctor.profilePicture = image;
    doctor.qualification = qualification;
    doctor.specialisation = specialisation;
    doctor.medicalLicence = medicalLicence;
    doctor.experienceDetail = experiencelist;

    await doctor.save();
    return { message: 'Profile updated successfully' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating profile:', error.message);
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}




}
 
