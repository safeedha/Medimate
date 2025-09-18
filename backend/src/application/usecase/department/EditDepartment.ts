
import {IDepartment} from '../../../domain/entities/Departnment'
import { IEditDept } from "../../../domain/useCaseInterface/department/IEditDept";
import { IBaseRepository } from '../../../domain/repository/BaseRepository'

export class EditDept implements IEditDept {
  constructor(private _baseRepository: IBaseRepository<IDepartment>) {}

  async editDept(deptData: IDepartment): Promise<{ message: string }> {
    try {
      const { deptname, description } = deptData;
      const mdeptname = deptname.trim().toLowerCase();

      

      const newDeptData = {
        deptname: mdeptname,
        description: description,
      };

      await this._baseRepository.update(deptData._id!,newDeptData);
      return { message: "Department edited successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}