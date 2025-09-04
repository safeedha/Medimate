import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import { ISlotRepository } from '../../../domain/repository/SlotRepository';
import { Appointment } from '../../../domain/entities/Appoinment';
import {ICreateAppointment } from '../../../domain/useCaseInterface/appoinment/ICreateAppointment';
import {IWalletRepository} from '../../../domain/repository/WalletRepository';;
export class CreateAppointment implements ICreateAppointment{
  constructor(private appointmentRepo: IAppointmentRepository,private slotRepository:ISlotRepository,private walletRepository:IWalletRepository ) {}

  async createAppointment(id: string, doctorId: string, slot: string, name: string, email: string, age: number, gender: 'male' | 'female' | 'other', reason: string ,amount:number): Promise<{ message: string}> {
    try {
      const data:Appointment={
        user_id: id,
        doctor_id: doctorId,
        schedule_id: slot,
        patient_name: name,
        patient_email: email,
        patient_age: age,
        patient_gender:gender,
        reason: reason,
        status: 'pending',
        payment_status: 'paid',
     }
     
      const appointment  = await this.appointmentRepo.createappoinment(data);
          await this.slotRepository.changeStatus(slot);
         await this.walletRepository.addmoneywallet(amount, id, doctorId,appointment._id!)
  
      return { message: 'Appointment created successfully' };
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  }
}
