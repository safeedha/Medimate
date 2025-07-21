export interface ICancelSlot {
  cancelSlot(slotId: string): Promise<string>;
}