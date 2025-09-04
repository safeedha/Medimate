import {  AdminWalletTransaction } from '../../domain/entities/Adminwallet';

import{Transaction} from '../../domain/entities/Doctorwallet';
import{UserTransaction} from '../../domain/entities/Userwallet';
export interface IWalletRepository { 
addmoneywallet(amount:number,userid:string,doctorid:string,appid:string):Promise<string>
getdminwallet(page:number,limit:number):Promise<{ transaction:AdminWalletTransaction[];balance: number; total: number}>
getRefundTransaction(appoinmentId:string):Promise<string>
getPayoutinfor():Promise<AdminWalletTransaction[]>
getdoctorwallet(doctorId:string,page:number,limit:number):Promise<{ balance: number; transaction: Transaction[]; total: number }>
addpaytodoctor(transactionId:string,doctorid:string):Promise<{message:string}>
addrefund(transactionId:string):Promise<string>
getuserwallet(userid:string,page:number,limit:number):Promise<{ balance: number;  transaction: UserTransaction[],total:number }>
adduserwallet(id:string,amount:number):Promise<void>

}