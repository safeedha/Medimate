import {DepartmentRepository} from '../../doamin/repository/department-repository';
import {Department} from '../../doamin/entities/departnment';
import DepartmentModel from '../database/models/department';

export class MongoDeptRepository implements DepartmentRepository {
   async add(deptData: Department): Promise<Department> {
    const newDept = new DepartmentModel(deptData);
    return await newDept.save();
   }
   async getAll(): Promise<Department[]> {
    return await DepartmentModel.find({});
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
    
}