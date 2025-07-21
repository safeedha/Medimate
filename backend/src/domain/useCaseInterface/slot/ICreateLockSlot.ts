export interface ICreateLockSlot {
  createLock(slotId: string, doctorId: string): Promise<string>;
}