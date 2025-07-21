import { Request, Response, NextFunction } from 'express';
import { IAddReport } from '../../../domain/useCaseInterface/report/IAddReport';
import { HttpStatus } from '../../../common/httpStatus';
interface CustomRequest extends Request {
  id: string; 
}

export class ReportController {
  constructor(private addReport: IAddReport ) {}

  async addReportforAppoinment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.id;
      const { htmlcontent, appoinmentId, userId,medicine } = req.body;

      const report = await this.addReport.addReport(htmlcontent, appoinmentId, userId,medicine);

      res.status(HttpStatus.CREATED).json(report);
    } catch (error) {
      next(error); 
    }
  }
}
