import {IndividualSlot} from '../../entities/Sot'

export interface IGetSlotByDate {
  getSlotsByDate(doctorId: string, date: Date): Promise<IndividualSlot[]>;
}