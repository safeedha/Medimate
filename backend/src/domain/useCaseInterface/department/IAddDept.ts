import {Department} from '../../entities/Departnment'
export interface IAddDept {
  addDept(data: Department): Promise<{ message: string }>;
}