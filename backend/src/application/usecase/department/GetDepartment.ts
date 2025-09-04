import {IDepartmentRepository} from '../../../domain/repository/DepartmentRepository'
import { DepartmentDTO } from '../../../dto/doctor.dto';
import { IGetDept } from "../../../domain/useCaseInterface/department/IGetDept";

export class GetDept implements IGetDept {
 constructor(private deptRepository: IDepartmentRepository) {}
  async getAllDept(page?:number,limit?:number,search?:string):Promise<{ data:DepartmentDTO[]; total: number }> {
    try {
        const {data, total} = await this.deptRepository.getAll(page,limit,search);
        const departmentDtos: DepartmentDTO[] = data.map((dept): DepartmentDTO => ({
        id: dept._id?.toString(),
        deptname: dept.deptname,
        description: dept.description,
        isblocked: dept.isblocked,
      }));
      return { data: departmentDtos, total }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
  }
}