import {Department} from '../entities/departnment'
import {DepartmentDTO } from '../../dto/doctor.dto'

export interface DepartmentRepository {
  add(deptData: Department): Promise<Department>;
  getAll(page?:number,limit?:number,search?:string): Promise<{ data: Department[]; total: number }>;
  getAllunblocked():Promise<DepartmentDTO[]>
  getById(id: string): Promise<Department | null>;
  blockstatus(id: string): Promise<Department | null>;
  delete(id: string): Promise<Department | null>;
  getByName(name: string): Promise<Department | null>;
  edit(deptData: Department): Promise<Department>;
}