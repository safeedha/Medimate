export interface Department { 
  _id?: string;
  deptname: string;
  description: string;
  isblocked?: boolean;
  createdAt?: Date;   // ← added
  updatedAt?: Date;  
}