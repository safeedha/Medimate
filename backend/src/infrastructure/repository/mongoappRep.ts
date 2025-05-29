import { appointmentRepository  } from '../../domain/repository/appoinment-rep';
import { Appointment } from '../../domain/entities/appoinment';
import { AppointmentModel} from '../database/models/appoinment';
import mongoose from "mongoose";

export class MongoAppointmentRepository implements appointmentRepository {
  async createappoinment(data: Appointment): Promise<Appointment> {
    try {
      const appointment = new AppointmentModel(data);
      await appointment.save();
      return appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  }
 async getpastappoinment(userId: string): Promise<Appointment[]> {
  try {
    const currentDate = new Date();

    const appointments = await AppointmentModel.find({ user_id: userId })
      .populate({
        path: 'schedule_id',
        match: {
          date: { $lt: currentDate } // only populate if the date is in the past
        }
      });

 
    const pastAppointments = appointments.filter(app => app.schedule_id);

    return pastAppointments;
  } catch (error) {
    console.error('Error fetching past appointments:', error);
    throw new Error('Failed to fetch past appointments');
  }
}

  async getfutureappoinment(userid: string): Promise<Appointment[]> {
  try {
    const now = new Date();

    const appointments = await AppointmentModel.find({ 
  user_id: userid, 
  status: { $in: ['pending', 'cancelled'] } 
   }).populate({
        path: 'schedule_id',
        match: {
          date: { $gte: now }  // dates in future or now
        }
      }).populate({
        path:'doctor_id'
      }).sort({created_at:-1});

  
    const futureAppointments = appointments.filter(app => app.schedule_id);

    return futureAppointments;
  } catch (error) {
    console.error('Error fetching future appointments:', error);
    throw new Error('Failed to fetch future appointments');
  }
}

async changestatus(id:string,status:'pending' |  'cancelled' | 'completed'):Promise<Appointment>{
  try{
      const appointment = await AppointmentModel.findById(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      appointment.status = status;
      await appointment.save();
      return appointment;
  }
  catch(error)
  {
    if (error instanceof Error)
         {
          throw Error(error.message)
         }
         throw Error("error in updating")
  }
}







async  getappinmentbydoctor(doctorid: string): Promise<Appointment[]> {
  try {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorid);

    const appointments = await AppointmentModel.aggregate([
      {
        $match: {
          doctor_id: doctorObjectId,
          status: "pending"
        }
      },
      {
         $lookup: {
        from: "slots", // collection name of schedule_id
        localField: "schedule_id",
        foreignField: "_id",
        as: "schedule"
       }
    },
    {$unwind:"$schedule"},
    {
    $sort: {
      "schedule.date": 1 // sort by schedule.date ascending
    }
  }
 ]);
    console.log(appointments)
    return appointments;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error in updating");
  }
}

async getallappinmentfordoctor(doctorid:string):Promise<Appointment[]>{
  try{
    const doctorObjectId = new mongoose.Types.ObjectId(doctorid);

    const appointments = await AppointmentModel.aggregate([
      {
        $match: {
          doctor_id: doctorObjectId,
        }
      },
      {
         $lookup: {
        from: "slots", // collection name of schedule_id
        localField: "schedule_id",
        foreignField: "_id",
        as: "schedule"
       }
    },
    {$unwind:"$schedule"},
    {
    $sort: {
      "schedule.date": 1 // sort by schedule.date ascending
    }
  }
 ]);
    return appointments
  }
    catch(error)
  {
    if (error instanceof Error)
         {
          throw Error(error.message)
         }
         throw Error("error in updating")
  }
}


}