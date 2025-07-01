import { Appointment } from '../../../domain/entities/appoinment';
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import{ AdminWallet} from "../../../domain/entities/adminwallet"

export class GetDoctorWallet {

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(doctrid:string,page:number,limit:number): Promise<any> {
    try {
      const wallet = await this.walletRepository.getdoctorwallet(doctrid,page,limit);
      return wallet
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}