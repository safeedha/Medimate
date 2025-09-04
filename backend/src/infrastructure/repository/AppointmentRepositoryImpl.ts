import { IAppointmentRepository } from '../../domain/repository/AppointmentRepository';
import { Appointment,AppointmentCountByDate} from '../../domain/entities/Appoinment';
import { AppointmentModel} from '../database/models/appoinment';
import {AppointmentDTO} from '../../dto/slot.dto'
import {IDepartmentSummary} from '../../dto/departmentsummary.dto'
import { SlotLock}  from '../database/models/slotlock'
import mongoose from "mongoose";


export class MongoAppointmentRepository implements IAppointmentRepository {
  async createappoinment(data: Appointment): Promise<Appointment> {
    try{    
      const appointment = new AppointmentModel(data);
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error('Failed to create appointment');
    }
  }

  async getcountofappoinmentofdoctor(id: string): Promise<Record<string, number>> {
  let _pending = 0;
  let _completed = 0;
  let _cancelled = 0;
  const _total=0
  const result = await AppointmentModel.find({ doctor_id: id });

  result.forEach((appointment) => {
    if (appointment.status === 'pending') {
      _pending++;
    } else if (appointment.status === 'completed') {
      _completed++;
    } else if (appointment.status === 'cancelled') {
      _cancelled++;
    }
  });

  return {
    total: result.length,
    completed:_completed,
    cancelled:_cancelled,
    pending:_pending,
  };
}


  async getfilteredapooinment(
  status: 'completed' | 'cancelled' | 'pending',
  start: Date,
  end: Date
): Promise<AppointmentCountByDate[]> {
  try {
    const result = await AppointmentModel.aggregate([
      {
        $match: { status }
      },
      {
        $lookup: {
          from: "slots",
          localField: "schedule_id",
          foreignField: "_id",
          as: "slot"
        }
      },
      { $unwind: "$slot" },
      {
        $match: {
          "slot.date": {
            $gte: start,
            $lte: end
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$slot.date"
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } 
      }
    ]);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error in fetching appointments");
  }
}

async getfilteredapooinmentfordoc(status: 'completed' | 'cancelled' | 'pending',start: Date,end: Date,id:string):Promise<AppointmentCountByDate[]>{
 try {
    const objId = new mongoose.Types.ObjectId(id)
    const result = await AppointmentModel.aggregate([
      {
        $match: { status, doctor_id: objId },

      },
      {
        $lookup: {
          from: "slots",
          localField: "schedule_id",
          foreignField: "_id",
          as: "slot"
        }
      },
      { $unwind: "$slot" },
      {
        $match: {
          "slot.date": {
            $gte: start,
            $lte: end
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$slot.date"
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } 
      }
    ]);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error in fetching appointments");
  }
}


   async getcountofappoinmentforeacdoc(status:'completed'|'pending'|'cancelled'): Promise<Record<string, number>> {
  try {
    const result = await  AppointmentModel.aggregate([
      {
        $match: { status: status } 
      },
      {
        $lookup: {
          from: "doctors",               
          localField: "doctor_id",
          foreignField: "_id",
          as: "doctor"
        }
      },
      {
        $unwind: "$doctor"               
      },
      {
        $group: {
          _id: "$doctor.firstname",           
          count: { $sum: 1 }
        }
      }
    ]);

    const countMap: Record<string, number> = {};
    result.forEach((item:any) => {
      countMap[item._id] = item.count;
    });

    return countMap;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error in fetching completed appointment counts by doctor");
  }
}

   async getdetails(): Promise<{ total: number; pending: number; completed: number; cancelled: number }> {
  const appointments = await AppointmentModel.find();

  let pending = 0;
  let completed = 0;
  let cancelled = 0;

  appointments.forEach((appointment) => {
    if (appointment.status === 'pending') {
      pending++;
    } else if (appointment.status === 'completed') {
      completed++;
    } else if (appointment.status === 'cancelled') {
      cancelled++;
    }
  });

  const total = appointments.length;

  return { total, pending, completed, cancelled };
}
  async rescheduleStatus(id: string, rescheduleId: string): Promise<Appointment> {
  try {
    const appointment = await AppointmentModel.findOne({ _id: id });

    if (!appointment) {
      throw new Error('Appointment not found');
    }
    appointment.rescheduled_to = rescheduleId;
    appointment.isRescheduled = true;
    await appointment.save();
    return appointment;
  } catch (error) {
      if (error instanceof Error)
         {
          throw Error(error.message)
         }
         throw Error("error in updating")
  }
}

 async getpastappoinment(userId: string): Promise<Appointment[]> {
  try {
    const currentDate = new Date();
    const now = new Date();
     const appointments = await AppointmentModel.find({ 
      user_id: userId
      }).populate({
            path: 'schedule_id',
            match: {
              date: { $lte: now }  // dates in future or now
            }
          }).populate({
            path:'doctor_id'
          }).sort({created_at:-1});
    const pastAppointments = appointments.filter(app => app.schedule_id);
    return pastAppointments;
  } catch (error) {
    console.error('Error fetching past appointments:', error);
    throw new Error('Failed to fetch past appointments');
  }
}

  async getpageforuserId( id:string,originalId:string,limit:number):Promise<number>{
    try{
          const appointments = await AppointmentModel.find({ 
      user_id: id, 
      }).populate({
        path: 'schedule_id',
      }).populate({
        path:'doctor_id'
      }).sort({created_at:-1});
      const futureAppointments = appointments.filter(app => app.schedule_id);
     const index = futureAppointments.findIndex(app => app._id.toString() === originalId);

    if (index === -1) {
      throw new Error('Appointment not found');
    }
    const page = Math.floor(index / limit) + 1;
    return page;
    }
    catch(error)
    {
    console.error('Error fetching past appointments:', error);
    throw new Error('Failed to get page');
    }
  }

  async getfutureappoinment(userid: string,page:number,limit:number): Promise<{total:number,appoi:Appointment[]}> {
  try {
    const now = new Date();
    const appointments = await AppointmentModel.find({ 
  user_id: userid, 
   }).populate({
        path: 'schedule_id',
      }).populate({
        path:'doctor_id'
      }).sort({created_at:-1});

    const futureAppointments = appointments.filter(app => app.schedule_id);
       const total = futureAppointments.length;
    const startIndex = (page - 1) * limit;
    const paginatedAppointments = futureAppointments.slice(startIndex, startIndex + limit);
    return {
      total,
      appoi: paginatedAppointments
    };  
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

      if(status==='cancelled')
      {
        await SlotLock.deleteOne({slotId:appointment.schedule_id})
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
async getpageforId( id:string,originalId:string,limit:number):Promise<number>{
    const doctorObjectId = new mongoose.Types.ObjectId(id);
    const originalObjectId = new mongoose.Types.ObjectId(originalId);
     const appointments = await AppointmentModel.aggregate([
      {
        $match: {
          doctor_id: doctorObjectId,
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "schedule_id",
          foreignField: "_id",
          as: "schedule",
        },
      },
      { $unwind: "$schedule" },
      {
        $sort: {
          "schedule.date": 1,
        },
      }])
       const index = appointments.findIndex(item => item._id.toString() === originalObjectId.toString());
       if (index === -1) throw new Error("Appointment not found");


      const page = Math.floor(index / limit) + 1;
      return page;

}

async  getappinmentbydoctor(
  doctorid: string,
  page: number,
  limit: number
): Promise<{ total: number; appointments: AppointmentDTO[] }> {
  try {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorid);
    const countResult = await AppointmentModel.countDocuments({
      doctor_id: doctorObjectId,
    });
 
   const appointments = await AppointmentModel.aggregate([
  {
    $match: {
      doctor_id: doctorObjectId,
    },
  },
  {
    $lookup: {
      from: "slots",
      localField: "schedule_id",
      foreignField: "_id",
      as: "schedule",
    },
  },
  { $unwind: "$schedule" },
  {
    $sort: {
      created_at: -1, 
    },
  },
  {
    $skip: (page - 1) * limit,
  },
  {
    $limit: limit,
  },
]);

   const mappedAppointments: AppointmentDTO[] = appointments.map((item: any) => ({
      _id: item._id.toString(),
      user_id: item.user_id?.toString(),
      doctor_id: item.doctor_id?.toString(),
      schedule_id: item.schedule_id?.toString(),
      patient_name: item.patient_name,
      patient_email: item.patient_email,
      patient_age: item.patient_age,
      patient_gender: item.patient_gender,
      reason: item.reason,
      status: item.status,
      payment_status: item.payment_status,
      reportAdded: item.reportAdded || false,
      schedule: {
        _id: item.schedule._id.toString(),
        recurringSlotId: item.schedule.recurringSlotId?.toString(),
        doctorId: item.schedule.doctorId?.toString(),
        date: item.schedule.date,
        startingTime: item.schedule.startingTime,
        endTime: item.schedule.endTime,
        status: item.schedule.status,
      },
      followup_id:item.followup_id?.toString(),
      followup_status:item.followup_status,
      rescheduled_to: item.rescheduled_to?.toString(),
      isRescheduled:item?.isRescheduled
    }));

    return {
      total: countResult,
      appointments: mappedAppointments,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error in retrieving appointments");
  }
}


async createfollowp(appoinmentId:string,followupid:string):Promise<string>{
  try{
   const appointments = await AppointmentModel.findOne({_id:appoinmentId})

   console.log(appointments)
   if(!appointments )
   {
    throw new Error('this appoinments not exist')
   }
    appointments.followup_status=true
    appointments.followup_id=followupid
    await appointments.save()
   return 'followup appoinment created'
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
      "schedule.date": -1 // sort by schedule.date ascending
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

  async getsingleappoinment(id:string):Promise<Appointment>{
      try{
          const appointment = await AppointmentModel.findById(id).populate(  {path: 'schedule_id',});
          if(!appointment)
          {
            throw new Error('no appoinment found')
          }
          return  appointment
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

  async getdepartmentsummary():Promise<IDepartmentSummary[]>{
      const result = await AppointmentModel.aggregate([
            {
              $lookup: {
                from: "doctors", 
                localField: "doctor_id",
                foreignField: "_id",
                as: "doctorData",
              },
            },
            { $unwind: "$doctorData" },
            {
              $lookup: {
                from: "departments", 
                localField: "doctorData.specialisation",
                foreignField: "_id",
                as: "departmentData",
              },
            },
            { $unwind: "$departmentData" },

            {
              $group: {
                _id: {
                  departmentId: "$departmentData._id",
                  departmentName: "$departmentData.deptname",
                  status: "$status",
                },
                count: { $sum: 1 },
              },
            },    

            {
              $group: {
                _id: {
                  departmentId: "$_id.departmentId",
                  departmentName: "$_id.departmentName",
                },
                total: { $sum: "$count" },
                pending: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.status", "pending"] }, "$count", 0],
                  },
                },
                completed: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.status", "completed"] }, "$count", 0],
                  },
                },
                cancelled: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.status", "cancelled"] }, "$count", 0],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                departmentName: "$_id.departmentName",
                total: 1,
                pending: 1,
                completed: 1,
                cancelled: 1,
              },
            },
                ]);       
       console.log(result)
        return result;
  }
  


}