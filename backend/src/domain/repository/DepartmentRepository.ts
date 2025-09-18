import {IDepartment} from '../entities/Departnment'


export interface IDepartmentRepository {
  getAllunblocked():Promise<IDepartment[]>
  getByName(name: string): Promise<IDepartment | null>;
}