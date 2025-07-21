import {DepartmentRepository} from '../../../domain/repository/department-repository'
import {DepartmentDTO } from '../../../dto/doctor.dto'
import {IGetUnblockedDepartments} from "../../../domain/useCaseInterface/department/IGetUnblockedDepartments"


export class GetAllUnblockedDept implements IGetUnblockedDepartments{
 constructor(private deptRepository: DepartmentRepository) {}
  async getAllunblockedDept():Promise<DepartmentDTO[]> {
    try {
        console.log('hey')
        const departments = await this.deptRepository.getAllunblocked();
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