import { ReportRepository } from '../../domain/repository/report-rep';
import { IReport } from '../../domain/entities/report';
import { Report } from "../database/models/report"
import { AppointmentModel} from '../database/models/appoinment';
import mongoose from 'mongoose';
export class MongoreportRepository implements ReportRepository {
  async addReport(htmlContent: string, appointmentId: string, userId: string): Promise<string> {
    try {
      const newReport: IReport = {
        content: htmlContent,
        appointmentId,
        userId,
        createdAt: new Date()
      };

      const savedReport = await Report.create(newReport);
      const appoinment=await  AppointmentModel.findOne({_id:appointmentId})
      if(!appoinment)
      {
        throw new Error('appoinment not exist')
      }
       appoinment.reportAdded=true
       await  appoinment?.save()

      return 'report added successfully'
    } catch (error) {
      console.error('Error adding report:', error);
      throw new Error('Could not save report');
    }
  }
  async getReport(appId: string): Promise<IReport> {
  try {
      const objectId = new mongoose.Types.ObjectId(appId); // convert string to ObjectId

    const savedReport = await Report.findOne({ appointmentId:objectId });

    if (!savedReport) {
      throw new Error('Report not found for the given appointment ID');
    }
      return {
      content: savedReport.content,
      appointmentId: savedReport.appointmentId.toString(),
      userId: savedReport.userId.toString(),
      createdAt: savedReport.createdAt,
    };

  } catch (error) {
    console.error('Error fetching report:', error);
    throw new Error('Could not fetch report');
  }
}
}
