export interface IGetAppointmentPagination {
  getpageforappoinment(
    id: string,
    originalId: string,
    limit: number
  ): Promise<number>;
}