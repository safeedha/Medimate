import {IDepartment} from '../../entities/Departnment'
export interface IEditDept {
  editDept(data: IDepartment): Promise<{ message: string }>;
}