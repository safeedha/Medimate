export interface IChangeAppointmentStatus {
  changestus(
    appointmentId: string,
    status: 'pending' | 'cancelled' | 'completed',
    reschedule?: boolean
  ): Promise<{ message: string }>;
}