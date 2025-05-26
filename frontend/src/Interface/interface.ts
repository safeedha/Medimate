export interface Iuser{
  _id?:string,
  firstname:string,
  lastname?:string,
  email:string,
  password?:string,
  phone:string|null,
  googleIds?:string|null,
  isBlocked:boolean,
  googleVerified?:boolean,
  gender?:"male"|"female"|"other",
  age?:number
}

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
export type SlotStatus = "available" | "booked" | "cancelled";

export interface IndividualSlot {
  _id?: string;                 // use string if you prefer or ObjectId for backend
  recurringSlotId: string|IRecurring      // reference to the recurring slot (_id as string)
  doctorId: string|Idoctor;             // the doctor related to this slot
  date: Date;
  startingTime:string;
  endTime:string             // date and time of the individual slot
  status: SlotStatus;           
               
}



export interface Appointment {
  _id?: string; 
  user_id: string| Iuser; // User who booked the appointment
  doctor_id: string| Idoctor; // Doctor for the appointment
  schedule_id: string| IndividualSlot; // Schedule details for the appointment
  

 
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';

  created_at?: Date;
  updated_at?: Date;
}
