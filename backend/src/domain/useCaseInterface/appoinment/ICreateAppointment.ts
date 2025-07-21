
export interface ICreateAppointment {
  createAppointment(
    userId: string,
    doctorId: string,
    slotId: string,
    name: string,
    email: string,
    age: number,
    gender: 'male' | 'female' | 'other',
    reason: string,
    amount: number
  ): Promise<{ message: string}>;
}