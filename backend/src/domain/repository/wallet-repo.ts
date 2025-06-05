import{ AdminWallet} from "../entities/adminwallet"

export interface WalletRepository { 
addmoneywallet(amount:number,userid:string,doctorid:string,appid:string):Promise<string>
getdminwallet():Promise<any>
getRefundTransactions():Promise<any>
getPayoutinfor():Promise<any>
getdoctorwallet(doctorId:string):Promise<any>
addpaytodoctor(transactionId:string,doctorid:string):Promise<{message:string}>
addrefund(transactionId:string):Promise<string>

getuserwallet(userid:string):Promise<any>

}