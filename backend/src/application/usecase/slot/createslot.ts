import {ISlotRepository} from '../../../domain/repository/SlotRepository';
import {Weekdays} from '../../../domain/entities/Recurringslot';

import { RRule } from 'rrule';
import {convertTo12HourFormat} from '../../service/timeconvert'
import {IndividualSlot} from '../../../domain/entities/Sot'
import { ICreateSlot } from '../../../domain/useCaseInterface/slot/ICreateSlot';
import {IRecurring } from '../../../domain/entities/Recurringslot'
// const dayMap: Record<string, Weekday> = {
//   MO: RRule.MO,
//   TU: RRule.TU,
//   WE: RRule.WE,
//   TH: RRule.TH,
//   FR: RRule.FR,
//   SA: RRule.SA,
//   SU: RRule.SU,
// };
export class CreateSlot implements ICreateSlot{

  constructor(private slotrepository: ISlotRepository) {}
  async createSlots(id:string,startDate:string,endDate:string,selectedDays:Weekdays[],startTime:string,endTime:string,interval:number,frequency:"WEEKLY"|"DAILY"): Promise<{message:string}> {
    try {
  
       const [startHour, startMinute] = startTime.split(':').map(Number);
       const [year, month, day] = startDate.split('-').map(Number);
       const dtStart = new Date(Date.UTC(year, month - 1, day, startHour, startMinute, 0));



      const until = new Date(endDate);
      until.setHours(23, 59, 59, 999);
    

    
      const rule = new RRule({
        freq: RRule[frequency],
        interval,
        byweekday: selectedDays,
        dtstart: dtStart,
        until,
      });

     const st=convertTo12HourFormat(startTime)
     const et=convertTo12HourFormat(endTime)
      const allSlots = rule.all();

      const data:IRecurring={
        doctorId:id,
        startDate:dtStart,
        endDate:until,
        frequency:frequency,
        interval:interval,
        daysOfWeek:selectedDays,
        starttime:startTime,
        endttime:endTime
       }

  const recurringslot = await this.slotrepository.createRecurringSlot(data);

for (const item of allSlots) {
  const date = new Date(item);  
  
  
  const slotData: IndividualSlot = {
    recurringSlotId: recurringslot._id!,  
    doctorId: id,
    date: date,
    startingTime: st,
    endTime: et,
    status: "available"
  };

     await this.slotrepository.createSlot(slotData);
  
 }
      
  return {message:"slot creation sucessfull"}
      
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
 
  }
}