import{ AdminWallet} from "../entities/adminwallet"

export interface WalletRepository { 
addmoneywallet(amount:number,userid:string,doctorid:string,appid:string):Promise<string>
getdminwallet():Promise<AdminWallet[]>



}