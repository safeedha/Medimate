
import { IReport } from '../../domain/entities/Report';
import { Report } from "../database/models/report"
import { AppointmentModel} from '../database/models/appoinment';
import { BaseRepository } from './BaseRepositoryImpl';
import mongoose from 'mongoose';

export class MongoreportRepository  extends BaseRepository<IReport> {
  async create(data: IReport): Promise<void> {
  try {
   
    const newReport = new Report({
      content: data.content,
      appointmentId: data.appointmentId,
      userId: data.userId,
      medicine: data.medicine,
      createdAt: new Date(),
    });

    await newReport.save();

   
    const appointment = await AppointmentModel.findById(data.appointmentId);
    if (!appointment) {
      throw new Error('Appointment does not exist');
    }

    appointment.reportAdded = true;
    await appointment.save();

    
  } catch (error) {
    console.error('Error adding report:', error);
    throw new Error('Could not save report');
  }
}

  async findById(appId: string): Promise<IReport> {
  try {
      const objectId = new mongoose.Types.ObjectId(appId); 

    const savedReport = await Report.findOne({ appointmentId:objectId });

    if (!savedReport) {
      throw new Error('Report not found for the given appointment ID');
    }
      return {
      content: savedReport.content,
      appointmentId: savedReport.appointmentId.toString(),
      userId: savedReport.userId.toString(),
      medicine:savedReport.medicine,
      createdAt: savedReport.createdAt,
    };

  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error('Could not fetch report');
  }
}
}
