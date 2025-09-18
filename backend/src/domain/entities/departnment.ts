export interface IDepartment { 
  _id?: string;
  deptname: string;
  description: string;
  isblocked?: boolean;
  createdAt?: Date;   // ← added
  updatedAt?: Date;  
}


export interface IDepartmentSummary {
  departmentName: string;
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
}