export interface ICancelRecurringSlot {
  cancelSlots(recurringId: string): Promise<string>;
}
