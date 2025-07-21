export interface IEditSlot {
  editSlots(
    recId:string,
    id: string,
    startDate: string,
    endDate: string,
    selectedDays: string[],
    startTime: string,
    endTime: string,
    interval: number,
    frequency: string
  ): Promise<{ message: string }>;
}