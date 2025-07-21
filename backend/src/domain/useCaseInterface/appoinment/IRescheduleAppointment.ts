export interface IRescheduleAppointment {
   createresedule(oldSlotId: string, newSlotId: string): Promise<String>;
}