export interface IPayToDoctor {
  paymentToDoctor(transactionId: string, doctorId: string): Promise<{ message: string }>;
}