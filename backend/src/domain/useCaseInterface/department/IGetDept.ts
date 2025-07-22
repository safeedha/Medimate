import {Department} from '../../../domain/entities/departnment'

export interface IGetDept {
  getAllDept(page?: number, limit?: number, search?: string): Promise<{
    data: Department[],
    total: number;
  }>;
}