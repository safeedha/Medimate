import {IDepartmentRepository} from '../../domain/repository/DepartmentRepository';
import {IDepartment} from '../../domain/entities/Departnment';
import DepartmentModel from '../database/models/department';


export class MongoDeptRepository implements IDepartmentRepository {
   async add(deptData: IDepartment): Promise<IDepartment> {
    const newDept = new DepartmentModel(deptData);
    return await newDept.save();
   }
    async getAll(
  page?: number,
  limit?: number,
  search?: string
): Promise<{ data: IDepartment[]; total: number }> {
  const filter = search
    ? { deptname: { $regex: search, $options: 'i' } }
    : {};
  if (typeof page === 'undefined' || typeof limit === 'undefined') {
    const [data, total] = await Promise.all([
      DepartmentModel.find(filter),
      DepartmentModel.countDocuments(filter),
    ]);
    return { data, total };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    DepartmentModel.find(filter).skip(skip).limit(limit),
    DepartmentModel.countDocuments(filter),
  ]);

  return { data, total };
}
    async getAllunblocked():Promise<IDepartment[]>
    {

        const dept=await DepartmentModel.find({isblocked:false})
        return dept
    
    }
    async getByName(name: string): Promise<IDepartment | null> {
    return await DepartmentModel.findOne({ deptname: name });
    }

    async getById(id: string): Promise<IDepartment | null> {
        return await DepartmentModel.findById(id);
    }
    async update(id: string, deptData: Partial<IDepartment>): Promise<IDepartment | null> {
        return await DepartmentModel.findByIdAndUpdate(id, deptData, { new: true });
    }
    async delete(id: string): Promise<IDepartment | null> {
        return await DepartmentModel.findByIdAndDelete(id);
    }
    async edit(deptData: IDepartment): Promise<IDepartment> {
    
        const { _id, deptname, description } = deptData;
        console.log(_id)
        const existingDept = await DepartmentModel.findOne({deptname:deptname, _id: {$ne: _id}});
        if (existingDept) {
            throw new Error('Department name already exists');
        }
        const updatedDept = await DepartmentModel.findByIdAndUpdate(_id, { deptname, description }, { new: true });
        if (!updatedDept) {
            throw new Error('Department not found');
        }
        return updatedDept;
    }

    async blockstatus(id: string): Promise<IDepartment | null> {
        const dept = await DepartmentModel.findById(id);
        if (!dept) {
            throw new Error('Department not found');
        }
        dept.isblocked = !dept.isblocked;
        await dept.save();
        return dept;
    }
    
}