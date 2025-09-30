
import { DepartmentDTO } from '../../../dto/doctor.dto';
import { IGetDept } from "../../../domain/useCaseInterface/department/IGetDept";
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import {IDepartment} from '../../../domain/entities/Departnment'

export class GetDept implements IGetDept {
 constructor(private _baseRepository: IBaseRepository<IDepartment>) {}
  async getAllDept(page:number,limit:number,search?:string):Promise<{ data:DepartmentDTO[]; total: number }> {
    try {
        const data = await this._baseRepository.findAll(page,limit,search);
        const departmentDtos: DepartmentDTO[] = data.map((dept): DepartmentDTO => ({
        id: dept._id?.toString(),
        deptname: dept.deptname,
        description: dept.description,
        isblocked: dept.isblocked,
      }));
      const total=await this._baseRepository.findcount(page,limit,search);
      console.log(total)
      return { data: departmentDtos, total:total.data}
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
  }
}