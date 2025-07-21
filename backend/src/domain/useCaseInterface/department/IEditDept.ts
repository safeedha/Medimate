import {Department} from '../../../domain/entities/departnment'
export interface IEditDept {
  editDept(data: Department): Promise<{ message: string }>;
}