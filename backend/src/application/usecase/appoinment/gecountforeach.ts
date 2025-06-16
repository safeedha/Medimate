import { appointmentRepository } from '../../../domain/repository/appoinment-rep';

export class GetCountofappforeachDoc {
  constructor(private appointmentRepo: appointmentRepository) {}

  async getcount(): Promise<Record<string, number>> {
    try {
      const result = await this.appointmentRepo.getcountofappoinmentforeacdoc();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error in fetching appointment overview");
    }
  }
}