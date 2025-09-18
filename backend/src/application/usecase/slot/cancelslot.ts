import {ISlotRepository} from '../../../domain/repository/SlotRepository';
import { ICancelSlot } from '../../../domain/useCaseInterface/slot/ICancelSlot';
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import {IndividualSlot} from '../../../domain/entities/Sot'

export class CancelSlot implements ICancelSlot{

  constructor(private _baseRepository:IBaseRepository<IndividualSlot>,private _slotrepository: ISlotRepository) {}
  async cancelSlot(id:string): Promise<string> {
    try {
      const slots= await this._baseRepository.delete(id)
      return slots
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}