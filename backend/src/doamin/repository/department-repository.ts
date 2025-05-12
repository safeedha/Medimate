import {Department} from '../../doamin/entities/departnment'

export interface DepartmentRepository {
  add(deptData: Department): Promise<Department>;
  getAll(): Promise<Department[]>;
  getById(id: string): Promise<Department | null>;
  update(id: string, deptData: Partial<Department>): Promise<Department | null>;
  delete(id: string): Promise<Department | null>;
  getByName(name: string): Promise<Department | null>;
}