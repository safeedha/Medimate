import {IGetDepartmentSummary} from '../../../domain/useCaseInterface/appoinment/IGetdeaprtmentsummary'
import {IDepartmentSummary} from '../../../dto/departmentsummary.dto'
import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
export class GetdepartmentSummary implements IGetDepartmentSummary{
  constructor(private appointmentRepo: IAppointmentRepository)
  {

  }
 async getsummary():Promise<IDepartmentSummary[]>{
    const summary=this.appointmentRepo.getdepartmentsummary()
    return summary
 }
}