import {IUser} from './User';


export interface UserTransaction {
  type: 'credit' | 'debit';
  amount: number;
  date: Date;
}

export interface IUserWallet  {
  userId:string|IUser;
  balance: number;
  transactions: UserTransaction[];
  lastUpdated: Date;
}
