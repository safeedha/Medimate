import {DepartmentDTO } from '../../../dto/doctor.dto'

export interface IGetUnblockedDepartments {
  getAllunblockedDept(): Promise<DepartmentDTO[]>; // You can replace `any[]` with a `Department[]` model if defined
}