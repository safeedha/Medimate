import {Iuser} from './User';
import {Idoctor} from './Doctor';

export interface IDoctorReview {
  _id?: string;
  doctorId: string|Idoctor;
  userId: string|Iuser;      
  rating: number;   
  comment: string;  
  createdAt?: Date;
  updatedAt?: Date;
}