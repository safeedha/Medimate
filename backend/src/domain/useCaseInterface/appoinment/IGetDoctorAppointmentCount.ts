export interface IGetDoctorAppointmentCount {
  getcountofappoinment(doctorId: string): Promise<Record<string, number>>;
}