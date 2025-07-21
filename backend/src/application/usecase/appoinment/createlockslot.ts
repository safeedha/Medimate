
import { slotRepository } from '../../../domain/repository/slot-repository';
import { SlotLockDTO  } from '../../../dto/slot.dto'
import {ICreateLockSlot } from '../../../domain/useCaseInterface/slot/ICreateLockSlot';
export class CreateLockslot implements ICreateLockSlot{
  constructor(private slotRepository:slotRepository) {}

  async createLock(slot:string,doctorId:string): Promise<string> {
    try {
      const slotlocked: SlotLockDTO={
        doctorId: doctorId,
        slotId: slot,        
      }
      const slotlock=await this.slotRepository.lockAvailableSlot(slotlocked)
      return slotlock
    } catch (error) {
     if(error instanceof Error)
     {
       throw new Error(error.message)
     }
     else{
      throw new Error('some error occured')
     }
    }
  }
}
