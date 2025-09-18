import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
import { ISlotRepository} from '../../../domain/repository/SlotRepository';
import { IWalletRepository } from '../../../domain/repository/WalletRepository';
import {IChangeAppointmentStatus } from '../../../domain/useCaseInterface/appoinment/IChangeAppointmentStatus';
export class ChangestatusAppointment implements IChangeAppointmentStatus{
  constructor(private _appointmentRepo:IAppointmentRepository,private slotRepository:ISlotRepository,private walletRepository:  IWalletRepository ) {}
   async changestus(appoinmentid:string,status: 'pending' |  'cancelled' | 'completed',reschedule=false):Promise<{message:string}>{
       try{
           const result=await this._appointmentRepo.changestatus(appoinmentid,status)
           if(status==='cancelled'){
          const slotId = result.schedule_id?.toString();
             await this.slotRepository.changeStatus(slotId);
         if(!result.followup_doc)
         {
          if(!reschedule)
          {
          const refunds = await this.walletRepository.getRefundTransaction(appoinmentid);
          await this.walletRepository.addrefund(refunds);
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