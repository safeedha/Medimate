import{Schema, model} from 'mongoose';
import {Department} from '../../../doamin/entities/departnment';

const departmentSchema = new Schema<Department>({
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

const DepartmentModel = model<Department>('Department', departmentSchema);
export default DepartmentModel;