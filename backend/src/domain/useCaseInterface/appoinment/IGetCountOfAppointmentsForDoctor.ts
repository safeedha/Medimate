export interface IGetCountOfAppointmentsForDoctor {
  getcount(status: 'completed' | 'pending' | 'cancelled'): Promise<any>;
}
