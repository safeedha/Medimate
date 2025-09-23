import {ISlotRepository} from '../../../domain/repository/SlotRepository';
import {IndividualSlot} from '../../../domain/entities/Sot'
import { IGetSlotByDate } from '../../../domain/useCaseInterface/slot/IGetSlotByDate';
export class GetSlotByDate implements IGetSlotByDate{
  constructor(private _slotrepository: ISlotRepository) {}

  async getSlotsByDate(id: string, date: Date): Promise<IndividualSlot[]> {
    try {
      const slots = await this._slotrepository.getSlotsByDate(id, date);
      return slots;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}