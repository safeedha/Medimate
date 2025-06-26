import {Iuser} from './user';
import {Idoctor} from './doctor';

export interface IDoctorReview {
  _id?: string;
  doctorId: string|Idoctor;
  userId: string|Iuser;      
  rating: number;   
  comment: string;  
  createdAt?: Date;
  updatedAt?: Date;
}