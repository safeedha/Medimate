import {IDepartmentRepository} from '../../domain/repository/DepartmentRepository';
import {IDepartment} from '../../domain/entities/Departnment';
import DepartmentModel from '../database/models/department';
import { BaseRepository } from './BaseRepositoryImpl';

export class MongoDeptRepository extends BaseRepository<IDepartment> implements IDepartmentRepository {
   async create(data: IDepartment): Promise<void> {
     const newDept = new DepartmentModel(data);
     await newDept.save();
   }
    async findAll(
    page: number,
    limit: number,
   search: string
): Promise< IDepartment[]> {
  const filter = search
    ? { deptname: { $regex: search, $options: 'i' } }
    : {};
 
  const skip = (page - 1) * limit;

  const data  = await DepartmentModel.find(filter).skip(skip).limit(limit)
  

  return data;
}

  async findcount(
  page: number,
  limit: number,
  search: string
): Promise<{ data: number }> {
  const filter = search
    ? { deptname: { $regex: search, $options: 'i' } }
    : {};

  const count = await DepartmentModel.countDocuments(filter);

  return { data: count };
}

    async getAllunblocked():Promise<IDepartment[]>
    {

        const dept=await DepartmentModel.find({isblocked:false})
        return dept
    
    }
    async getByName(name: string): Promise<IDepartment | null> {
    return await DepartmentModel.findOne({ deptname: name });
    }

    async findById(id: string): Promise<IDepartment | null> {
        return await DepartmentModel.findById(id);
    }

  
  
    async update(id:string,data: IDepartment): Promise<string> {
    
        const existingDept = await DepartmentModel.findOne({deptname:data.deptname, _id: {$ne: id}});
        if (existingDept) {
            throw new Error('Department name already exists');
        }
        const updatedDept = await DepartmentModel.findByIdAndUpdate(
          id,
          { 
            deptname: data.deptname,
            description: data.description
          },
          { new: true }
        );

        if (!updatedDept) {
            throw new Error('Department not found');
        }
        return "successfully updated";
    }

    async delete(id: string): Promise<string> {
        const dept = await DepartmentModel.findById(id);
        if (!dept) {
            throw new Error('Department not found');
        }
        dept.isblocked = !dept.isblocked;
        await dept.save();
        return "deleted successfully";
    }
    
}