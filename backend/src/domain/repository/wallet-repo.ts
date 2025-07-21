
import {WalletTransactionDto,AdminWalletTransactionDto,DoctorTransactionDTO} from '../../dto/wallet.dto'

export interface WalletRepository { 
addmoneywallet(amount:number,userid:string,doctorid:string,appid:string):Promise<string>
getdminwallet(page:number,limit:number):Promise<{ transaction: AdminWalletTransactionDto[]; balance: number; total: number }>
getRefundTransaction(appoinmentId:string):Promise<string>
getPayoutinfor():Promise<AdminWalletTransactionDto[]>
getdoctorwallet(doctorId:string,page:number,limit:number):Promise<{ balance: number; transaction: DoctorTransactionDTO[]; total: number }>
addpaytodoctor(transactionId:string,doctorid:string):Promise<{message:string}>
addrefund(transactionId:string):Promise<string>
getuserwallet(userid:string,page:number,limit:number):Promise<{ balance: number;  transactions: WalletTransactionDto[] }>
adduserwallet(id:string,amount:number):Promise<void>

}