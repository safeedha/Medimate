export interface IGetDashboardAppointment {
  getoverview(): Promise<{ total: number; pending: number; completed: number; cancelled: number }>;
}