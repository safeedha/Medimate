import {  IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';

import { Appointment } from '../../../domain/entities/Appoinment';
export class GetpastAppointment {
  constructor(private appointmentRepo:  IAppointmentRepository ) {}
   async getpastappoinment(userid:string):Promise<Appointment[]>{
        try{
          const result=await this.appointmentRepo.getpastappoinment(userid)
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