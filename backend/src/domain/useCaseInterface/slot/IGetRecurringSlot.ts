import {RecurringDTO} from '../../../dto/slot.dto';
export interface IGetRecurringSlot {
  getSlots(id: string, page: number, limit: number): Promise<{ data: RecurringDTO[]; total: number }>;
}