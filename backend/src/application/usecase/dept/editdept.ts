
import {Department} from '../../../doamin/entities/departnment'
import {DepartmentRepository} from '../../../doamin/repository/department-repository'


export class EditDept {
  constructor(private deptRepository: DepartmentRepository) {}

  async editDept(deptData: Department): Promise<{ message: string }> {
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