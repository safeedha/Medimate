
import { IBaseRepository } from '../../../domain/repository/BaseRepository'
import {IDepartment} from '../../../domain/entities/Departnment'
import { IBlockDept } from "../../../domain/useCaseInterface/department/IBlockDept";


export class BlockDept implements IBlockDept{
  constructor(private _baseRepository: IBaseRepository<IDepartment>) {}

  async blockDept(id: string): Promise<{ message: string }> {
    try {
     

      await this._baseRepository.delete(id);
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