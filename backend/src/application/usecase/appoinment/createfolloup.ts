import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
import {ICreateFollowUp} from '../../../domain/useCaseInterface/appoinment/ICreateFollowUp';


export class Createfollowup implements ICreateFollowUp{
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository) {}
   async createfollowpappinment(slotId:string,appoinmentId:string):Promise<string>{
       try{
             await this.slotRepository.changeStatus(slotId);
             const singleappoinment=await this.appointmentRepo.getsingleappoinment(appoinmentId)
             const data:Appointment={
                user_id:singleappoinment.user_id,
                doctor_id:singleappoinment.doctor_id,
                schedule_id: slotId,
                patient_name: singleappoinment.patient_name,
                patient_email:singleappoinment.patient_email,
                patient_age: singleappoinment.patient_age,
                patient_gender:singleappoinment.patient_gender,
                reason:`followup for ${singleappoinment.reason}`,
                status: 'pending',
                payment_status: 'paid',
                followup_doc:true
            }
            const appointment  = await this.appointmentRepo.createappoinment(data);

           const result=await this.appointmentRepo.createfollowp(appoinmentId,appointment._id!)
           return result
       }
       catch(error)
       {
         if (error instanceof Error)
         {
          throw Error(error.message)
         }
         throw Error("error in fetching")
       }
   }
}