import {Department} from '../../../domain/entities/departnment'
export interface IAddDept {
  addDept(data: Department): Promise<{ message: string }>;
}