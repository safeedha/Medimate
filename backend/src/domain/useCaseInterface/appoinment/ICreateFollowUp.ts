export interface ICreateFollowUp {
  createfollowpappinment(slotId: string, appointmentId: string): Promise<string>;
}