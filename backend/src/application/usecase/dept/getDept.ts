import {DepartmentRepository} from '../../../doamin/repository/department-repository'
import {Department} from '../../../doamin/entities/departnment'

export class GetDept {
 constructor(private deptRepository: DepartmentRepository) {}
  async getAllDept():Promise<Department[]> {
    try {
        const departments = await this.deptRepository.getAll();
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