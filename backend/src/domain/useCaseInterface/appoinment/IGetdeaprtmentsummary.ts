import {IDepartmentSummary} from '../../../dto/departmentsummary.dto'
export interface IGetDepartmentSummary {
  getsummary(): Promise<IDepartmentSummary[]>;
}