
import {Department} from '../../../doamin/entities/departnment'
import {DepartmentRepository} from '../../../doamin/repository/department-repository'


export class BlockDept {
  constructor(private deptRepository: DepartmentRepository) {}

  async blockDept(id: string): Promise<{ message: string }> {
    try {
     

      await this.deptRepository.blockstatus(id);
      return { message: "Department block status changed" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}