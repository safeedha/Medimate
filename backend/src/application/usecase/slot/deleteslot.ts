import {slotRepository} from '../../../domain/repository/slot-repository';



export class CancelSlot {

  constructor(private slotrepository: slotRepository) {}
  async cancelSlot(id:string): Promise<string> {
    try {
      const slots= await this.slotrepository.deleteslot(id)
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