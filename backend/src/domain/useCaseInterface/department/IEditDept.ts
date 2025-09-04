import {Department} from '../../entities/Departnment'
export interface IEditDept {
  editDept(data: Department): Promise<{ message: string }>;
}