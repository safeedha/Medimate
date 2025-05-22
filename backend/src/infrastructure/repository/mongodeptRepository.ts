import {DepartmentRepository} from '../../domain/repository/department-repository';
import {Department} from '../../domain/entities/departnment';
import DepartmentModel from '../database/models/department';

export class MongoDeptRepository implements DepartmentRepository {
   async add(deptData: Department): Promise<Department> {
    const newDept = new DepartmentModel(deptData);
    return await newDept.save();
   }
   async getAll(): Promise<Department[]> {
    return await DepartmentModel.find({isblocked:false});
   }
    async getByName(name: string): Promise<Department | null> {
    return await DepartmentModel.findOne({ deptname: name });
    }
    async getById(id: string): Promise<Department | null> {
        return await DepartmentModel.findById(id);
    }
    async update(id: string, deptData: Partial<Department>): Promise<Department | null> {
        return await DepartmentModel.findByIdAndUpdate(id, deptData, { new: true });
    }
    async delete(id: string): Promise<Department | null> {
        return await DepartmentModel.findByIdAndDelete(id);
    }
    async edit(deptData: Department): Promise<Department> {
    
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

    async blockstatus(id: string): Promise<Department | null> {
        const dept = await DepartmentModel.findById(id);
        if (!dept) {
            throw new Error('Department not found');
        }
        dept.isblocked = !dept.isblocked;
        await dept.save();
        return dept;
    }
    
}