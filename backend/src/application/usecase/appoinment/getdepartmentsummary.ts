import {IGetDepartmentSummary} from '../../../domain/useCaseInterface/appoinment/IGetdeaprtmentsummary'
import {IDepartmentSummary} from '../../../dto/departmentsummary.dto'
import { appointmentRepository  } from '../../../domain/repository/appoinment-rep';
export class GetdepartmentSummary implements IGetDepartmentSummary{
  constructor(private appointmentRepo: appointmentRepository)
  {

  }
 async getsummary():Promise<IDepartmentSummary[]>{
    const summary=this.appointmentRepo.getdepartmentsummary()
    return summary
 }
}