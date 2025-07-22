import {DepartmentDTO } from '../../../dto/doctor.dto'

export interface IGetUnblockedDepartments {
  getAllunblockedDept(): Promise<DepartmentDTO[]>; 
}