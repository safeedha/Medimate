
import {IDepartment} from '../../../domain/entities/Departnment'
import {IDepartmentRepository} from '../../../domain/repository/DepartmentRepository'
import { IAddDept } from "../../../domain/useCaseInterface/department/IAddDept";
import { IBaseRepository } from '../../../domain/repository/BaseRepository'

export class AddDept implements IAddDept{
  constructor(private _baseRepository: IBaseRepository<IDepartment>,private _deptRepository: IDepartmentRepository) {}

  async addDept(deptData: IDepartment): Promise<{ message: string }> {
    try {
      const { deptname, description } = deptData;
      const mdeptname = deptname.trim().toLowerCase();

      const existingDept = await this._deptRepository.getByName(mdeptname);
      if (existingDept) {
        throw new Error(`Department with name ${mdeptname} already exists`);
      }

      const data = {
        deptname: mdeptname,
        description: description,
      };

      await this._baseRepository.create(data);
      return { message: "Department added successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
