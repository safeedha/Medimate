import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { Appointment } from '../../../domain/entities/appoinment';
export class CreateAppointment {
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository ) {}

  async createAppointment(id: string, doctorId: string, slot: string, name: string, email: string, age: number, gender: 'male' | 'female' | 'other', reason: string ): Promise<{ message: string}> {
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
      const appointment = await this.appointmentRepo.createappoinment(data);
      const result=await this.slotRepository.changeStatus(slot);
      return { message: 'Appointment created successfully' };
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  }
}
