import {IUser} from './User';
import {IDoctor} from './Doctor';

export interface IDoctorReview {
  _id?: string;
  doctorId: string|IDoctor;
  userId: string|IUser;      
  rating: number;   
  comment: string;  
  createdAt?: Date;
  updatedAt?: Date;
}