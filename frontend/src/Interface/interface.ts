export interface Iuser{
  _id?:string,
  firstname:string,
  lastname?:string,
  email:string,
  password?:string,
  phone?:string|null,
  googleIds?:string|null,
  isBlocked:boolean,
  googleVerified?:boolean,
  gender?:"male"|"female"|"other",
  age?:number
}
export type formData= {
    fullName: string;
    age: string;
    gender: "male"|"female"|"other";
    email: string;
    phone: string;
    reason: string;
    paymentMethod: string;
}

export interface IDepartment {
  _id?: string;
  deptname: string;
  description?: string;
  createdAt?: Date;
  isblocked?: boolean;
   updatedAt?: Date;
}

export interface Idoctor {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  specialisation?: IDepartment;
  experience?: number;
  fee: number;
  status?: 'Approved' | 'Rejected' | 'Pending';
  isBlocked?: boolean;
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
  user_id: string| Iuser; 
  doctor_id: string| Idoctor; 
  schedule_id: string| IndividualSlot; 
  patient_name: string;
  patient_email: string;
  patient_age: number;
  patient_gender: 'male' | 'female' | 'other';
  reason: string;

  status: 'pending' |  'cancelled' | 'completed';
  payment_status: 'paid' | 'unpaid';
  rescheduled_to?: string| Appointment,
  isRescheduled?:boolean;
  reportAdded?: boolean; 
  followup_id?:string|Appointment,
  followup_status?:boolean;

  schedule?:string| IndividualSlot;
  created_at?: Date;
  updated_at?: Date;
}

export interface Transaction {
  _id:string,
  type: 'credit' | 'debit';
  amount: number;
  appointmentId?: string|Appointment;
  note?: string;
  date: Date;
}


export type LocationState = {
  email: string;
  role?:string
};


export type AppointmentCountByDate = {
  _id: string;    
  count: number;
};

export interface Message {
  _id:string;
  senderId: string | Iuser | Idoctor;
  recieverId: string | Idoctor | Iuser;
  message?: string;
  image?:string;
  messageType:'text'|'image'
  read?: boolean; 
 
}

export type MessagePayload = {
  from: string | undefined;
  to: string;
  roomId: string;
  message?: string;
  image?: string;
};

export interface AdminWalletTransaction {
  _id?: string;
  type: 'credit' | 'debit'|'refund';             
  amount: number;
  from: string |Iuser;          
  to: string | Idoctor; 
  toModel:'User'| 'Doctor'| 'Platform'
  doctorId:string|Idoctor          
  appointmentId: string|Appointment; 
  paymentstatus:boolean
  date: Date;
}
export interface Payout {
  _id: string;
  amount: number;
  doctorId: string;
}

export interface IDoctorReview {
  _id?: string;
  doctorId: string|Idoctor;
  userId: string|Iuser;      
  rating: number;   
  comment: string;  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepartmentProps {
  id: string;
  deptname: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface INotification {
  message: string;
  createdAt: string;
}

export interface Medicine {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}
export interface deptSummary{
    total: number,
    pending: number,
    completed: number,
    cancelled: number,
    departmentName: string
}