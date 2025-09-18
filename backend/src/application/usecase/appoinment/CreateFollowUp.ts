import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import { ISlotRepository } from '../../../domain/repository/SlotRepository';
import { Appointment } from '../../../domain/entities/Appoinment';
import {ICreateFollowUp} from '../../../domain/useCaseInterface/appoinment/ICreateFollowUp';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'

export class Createfollowup implements ICreateFollowUp{
  constructor(private _baseRepository: IBaseRepository<Appointment>,private _appointmentRepo:IAppointmentRepository,private slotRepository:ISlotRepository) {}
   async createfollowpappinment(slotId:string,appoinmentId:string):Promise<string>{
       try{
             await this.slotRepository.changeStatus(slotId);
             const singleappoinment=await this._baseRepository.findById(appoinmentId)
             if(!singleappoinment)
             {
                throw new Error("Failed to create single appointment");
             }
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
            const appointment  = await this._baseRepository.create(data);
            if (!appointment) {
            throw new Error("Failed to create appointment");
          }

           const result=await this._appointmentRepo.createfollowp(appoinmentId,appointment._id!)
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