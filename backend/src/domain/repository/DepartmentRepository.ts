import {IDepartment} from '../entities/Departnment'


export interface IDepartmentRepository {
  add(deptData: IDepartment): Promise<IDepartment>;
  getAll(page?:number,limit?:number,search?:string): Promise<{ data: IDepartment[]; total: number }>;
  getAllunblocked():Promise<IDepartment[]>
  getById(id: string): Promise<IDepartment | null>;
  blockstatus(id: string): Promise<IDepartment | null>;
  delete(id: string): Promise<IDepartment | null>;
  getByName(name: string): Promise<IDepartment | null>;
  edit(deptData: IDepartment): Promise<IDepartment>;
}