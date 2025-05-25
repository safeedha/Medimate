export interface IDepartment {
  _id: string;
  deptname: string;
  description?: string;
  createdAt?: Date;
  isblocked?: boolean;
   updatedAt?: Date;
}

export interface Idoctor {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  specialisation: IDepartment;
  experience: number;
  fee: number;
  status: 'Approved' | 'Rejected' | 'Pending';
  isBlocked: boolean;
  googleVerified?: boolean;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
}


export type  Weekdays= 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

export interface IRecurring {
  _id?: string;  
  doctorId:string|Idoctor
  startDate: Date;
  endDate: Date;
  frequency: "WEEKLY"|"DAILY";
  interval:number
  daysOfWeek: Weekdays[];
  starttime: string;
  endttime:string
}