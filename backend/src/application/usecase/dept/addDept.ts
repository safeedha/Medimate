
import {Department} from '../../../domain/entities/departnment'
import {DepartmentRepository} from '../../../domain/repository/department-repository'
import { IAddDept } from "../../../domain/useCaseInterface/department/IAddDept";

export class AddDept implements IAddDept{
  constructor(private deptRepository: DepartmentRepository) {}

  async addDept(deptData: Department): Promise<{ message: string }> {
    try {
      const { deptname, description } = deptData;
      const mdeptname = deptname.trim().toLowerCase();

      const existingDept = await this.deptRepository.getByName(mdeptname);
      if (existingDept) {
        throw new Error(`Department with name ${mdeptname} already exists`);
      }

      const newDeptData = {
        deptname: mdeptname,
        description: description,
      };

      await this.deptRepository.add(newDeptData);
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
