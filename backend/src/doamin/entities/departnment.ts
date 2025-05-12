export interface Department { 
  _id?: string;
  deptname: string;
  description: string;
  createdAt?: Date;   // ← added
  updatedAt?: Date;  
}