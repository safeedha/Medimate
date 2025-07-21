import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
import { slotRepository } from '../../../domain/repository/slot-repository';
import { WalletRepository } from '../../../domain/repository/wallet-repo';
import {IChangeAppointmentStatus } from '../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus';
export class ChangestatusAppointment implements IChangeAppointmentStatus{
  constructor(private appointmentRepo: appointmentRepository,private slotRepository:slotRepository,private walletRepository: WalletRepository) {}
   async changestus(appoinmentid:string,status: 'pending' |  'cancelled' | 'completed',reschedule=false):Promise<{message:string}>{
       try{
           const result=await this.appointmentRepo.changestatus(appoinmentid,status)
           if(status==='cancelled'){
          const slotId = result.schedule_id?.toString();
          const r= await this.slotRepository.changeStatus(slotId);
         if(!result.followup_doc)
         {
          if(!reschedule)
          {
          const refunds = await this.walletRepository.getRefundTransaction(appoinmentid);
          const response=await this.walletRepository.addrefund(refunds);
          return {message:"refund added"}
          }
        }
        }
          return {message:"Status updated"}
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