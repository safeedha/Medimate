import {Department} from '../entities/departnment'

export interface DepartmentRepository {
  add(deptData: Department): Promise<Department>;
  getAll(): Promise<Department[]>;
  getById(id: string): Promise<Department | null>;
  blockstatus(id: string): Promise<Department | null>;
  delete(id: string): Promise<Department | null>;
  getByName(name: string): Promise<Department | null>;
  edit(deptData: Department): Promise<Department>;
}