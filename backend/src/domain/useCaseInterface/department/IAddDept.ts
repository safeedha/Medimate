import {IDepartment} from '../../entities/Departnment'
export interface IAddDept {
  addDept(data: IDepartment): Promise<{ message: string }>;
}