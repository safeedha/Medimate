import{Schema, model} from 'mongoose';
import {IDepartment} from '../../../domain/entities/Departnment';

const departmentSchema = new Schema<IDepartment>({
  deptname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true,
});

const DepartmentModel = model<IDepartment>('Department', departmentSchema);
export default DepartmentModel;