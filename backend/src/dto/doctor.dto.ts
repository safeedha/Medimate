

export interface DepartmentDTO {
  id?: string;          
  deptname: string;
  description: string;
  isblocked?: boolean;
}
export interface DoctorDTO {
  _id?:string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  specialisation: string | DepartmentDTO| null;
  experience: number;
  fee: number;
  isBlocked?:boolean
  status?: "Approved" | "Rejected" | "Pending";
  qualification?: string;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
  googleVerified?: boolean;
}