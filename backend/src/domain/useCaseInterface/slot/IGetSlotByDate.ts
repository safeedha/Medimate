import {IndividualSlot} from '../../entities/slot'

export interface IGetSlotByDate {
  getSlotsByDate(doctorId: string, date: Date): Promise<IndividualSlot[]>;
}