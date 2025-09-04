
import {IDepartment} from '../../../domain/entities/Departnment'
import {IDepartmentRepository} from '../../../domain/repository/DepartmentRepository'
import { IEditDept } from "../../../domain/useCaseInterface/department/IEditDept";

export class EditDept implements IEditDept {
  constructor(private deptRepository: IDepartmentRepository) {}

  async editDept(deptData: IDepartment): Promise<{ message: string }> {
    try {
      const { deptname, description } = deptData;
      const mdeptname = deptname.trim().toLowerCase();

      

      const newDeptData = {
        _id: deptData._id,
        deptname: mdeptname,
        description: description,
      };

      await this.deptRepository.edit(newDeptData);
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