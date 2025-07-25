import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
import { IRescheduleAppointment} from '../../../domain/useCaseInterface/appoinment/IRescheduleAppointment';
export class Reshedule implements IRescheduleAppointment{
constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository) {}
   async createresedule(canceledappoinment:string,newslot:string):Promise<String>{
     const existing=await this.appointmentRepo.getsingleappoinment(canceledappoinment)
     const data:Appointment={
        user_id: existing.user_id,
        doctor_id: existing.doctor_id,
        schedule_id: newslot,
        patient_name: existing.patient_name,
        patient_email:existing.patient_email,
        patient_age:existing. patient_age,
        patient_gender:existing.patient_gender,
        reason: existing.reason,
        status: 'pending',
        payment_status: 'paid',
     }
      const appointment  = await this.appointmentRepo.createappoinment(data);
      const result=await this.appointmentRepo.rescheduleStatus(canceledappoinment,appointment._id!)
      const p=await this.slotRepository.changeStatus(newslot)

      return 'Appoinment rescheduled'
   }
}