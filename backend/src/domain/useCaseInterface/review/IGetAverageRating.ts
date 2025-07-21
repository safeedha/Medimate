export interface IGetAverageRating {
  getaveragerating(doctorId: string): Promise<number>;
}