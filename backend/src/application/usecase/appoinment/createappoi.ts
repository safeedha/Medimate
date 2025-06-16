import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';

import {WalletRepository} from '../../../domain/repository/wallet-repo';;
export class CreateAppointment {
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository,private walletRepository:WalletRepository ) {}

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
      const result=await this.slotRepository.changeStatus(slot);
      const wallet=await this.walletRepository.addmoneywallet(amount, id, doctorId,appointment._id!)
      console.log(wallet)
      return { message: 'Appointment created successfully' };
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  }
}
