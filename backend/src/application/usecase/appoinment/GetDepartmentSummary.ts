import {IGetDepartmentSummary} from '../../../domain/useCaseInterface/appoinment/IGetdeaprtmentsummary'
import {IDepartmentSummary}  from '../../../domain/entities/Departnment'
import { IAppointmentRepository  } from '../../../domain/repository/AppointmentRepository';
export class GetdepartmentSummary implements IGetDepartmentSummary{
  constructor(private _appointmentRepo: IAppointmentRepository)
  {

  }
 async getsummary():Promise<IDepartmentSummary[]>{
    const summary=this._appointmentRepo.getdepartmentsummary()
    return summary
 }
}