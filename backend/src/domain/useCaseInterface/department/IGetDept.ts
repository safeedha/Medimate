import { DepartmentDTO } from '../../../dto/doctor.dto';
export interface IGetDept {
  getAllDept(page?: number, limit?: number, search?: string): Promise<{
    data: DepartmentDTO[],
    total: number;
  }>;
}