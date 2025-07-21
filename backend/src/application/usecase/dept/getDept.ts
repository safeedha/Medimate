import {DepartmentRepository} from '../../../domain/repository/department-repository'
import {Department} from '../../../domain/entities/departnment'
import { IGetDept } from "../../../domain/useCaseInterface/department/IGetDept";

export class GetDept implements IGetDept {
 constructor(private deptRepository: DepartmentRepository) {}
  async getAllDept(page:number,limit:number,search:string):Promise<{ data: Department[]; total: number }> {
    try {
        const departments = await this.deptRepository.getAll(page,limit,search);
        return departments;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
  }
}