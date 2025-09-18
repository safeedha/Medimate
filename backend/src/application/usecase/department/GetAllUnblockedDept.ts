import { IDepartmentRepository } from '../../../domain/repository/DepartmentRepository';
import { DepartmentDTO } from '../../../dto/doctor.dto';
import { IGetUnblockedDepartments } from "../../../domain/useCaseInterface/department/IGetUnblockedDepartments";

export class GetAllUnblockedDept implements IGetUnblockedDepartments {
  constructor(private _deptRepository: IDepartmentRepository) {}

  async getAllunblockedDept(): Promise<DepartmentDTO[]> {
    try {
      const departments = await this._deptRepository.getAllunblocked();

      return departments.map((dept): DepartmentDTO => ({
        id: dept._id?.toString(),
        deptname: dept.deptname,
        description: dept.description,
        isblocked: dept.isblocked,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
