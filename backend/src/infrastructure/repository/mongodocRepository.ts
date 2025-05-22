import {DoctorRepository} from '../../doamin/repository/doctor-repository';
import {Doctor} from '../database/models/docter';
import {Idoctor} from '../../doamin/entities/doctor';


export class MongoDocRepository implements DoctorRepository {
  async getAllunverified(): Promise<Idoctor[]> {
    try {
      const doctors = await Doctor.find({ status: 'Pending' }).populate('specialisation');
         
      return doctors;
    } catch (error) {
      console.error('Error fetching unverified doctors:', error);
      throw new Error('Database error');
    }
  }
  async getAllverified(department?: string,search?:string): Promise<Idoctor[]> {
    try {
          let doctors = await Doctor.find({ status: 'Approved' ,isBlocked:false}).populate({
          path: 'specialisation',
          match: { isblocked: false } 
        });
        
        if(department)
        {  
          
          if(department==="All doctor")
          {
          
             doctors=doctors
          }
          else{
            console.log(department,"hi")
            doctors = doctors.filter((doc: Idoctor) => 
            typeof doc.specialisation === 'object' &&
            doc?.specialisation?.deptname === department
          );
          console.log(doctors)
        }
    }

     if(search)
        {
           doctors = doctors.filter((doc: Idoctor) => 
           doc.firstname.toLowerCase().includes(search.toLowerCase())
          )
        }

      return doctors;
    } catch (error) {
      console.error('Error fetching verified doctors:', error);
      throw new Error('Database error');
    }
  }
  async getSingleDoctor(id:string):Promise<Idoctor>{
       try{
         const doctor = await Doctor.findById(id);
          if (!doctor) {
            throw new Error('Doctor not found');
          }
          return doctor
       }
       catch(error)
       {
         if (error instanceof Error) {
            throw new Error(error.message);
          }
           throw new Error('Unknown error occurred');
       }
  }



  async changeStatus(id: string): Promise<Idoctor[]> {
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.isBlocked = !doctor.isBlocked;
      await doctor.save();
      console.log("hello")
      return await Doctor.find({status:"Approved"});
    } catch (error) {
      console.error('Error changing doctor status:', error);
      throw new Error('Database error');
    }
  }

  async verification(id: string, status: 'Approved' | 'Rejected'): Promise<Idoctor[]>
   {
      try{
        const doctor = await Doctor.findById(id);
        if (!doctor) {
          throw new Error('Doctor not found');
        }
        doctor.status = status;
        await doctor.save();
        return await Doctor.find({status:"Pending"});
      }
      catch(error){
          if (error instanceof Error) {
            console.error('Error verifying doctor:', error.message);
            throw new Error(error.message);
          }
           throw new Error('Unknown error occurred');
      }
   }
    

  async profileupdate(
  firstname: string,
  lastname: string,
  experience: number,
  fee: number,
  image: string,
  email: string,
  phone: string,
 specialisation:string,
 qualification:string
): Promise<{ message: string }> {
  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    
    const existingDoctorWithPhone = await Doctor.findOne({
      phone: phone,
      email: { $ne: email }, // Not the same doctor
    });

    if (existingDoctorWithPhone) {
      throw new Error('Phone number already exists for another doctor');
    }

    // ✅ Update doctor details
    doctor.firstname = firstname;
    doctor.lastname = lastname;
    doctor.experience = experience;
    doctor.fee = fee;
    doctor.phone = phone;
    doctor.profilePicture = image;
    doctor.qualification=qualification,
    doctor.specialisation=specialisation

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
 
