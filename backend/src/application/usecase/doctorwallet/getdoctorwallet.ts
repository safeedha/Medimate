import { Appointment } from '../../../domain/entities/appoinment';
import {WalletRepository} from '../../../domain/repository/wallet-repo';


export class GetDoctorWallet {

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(doctorid:string): Promise<any> {
    try {
   
      const wallet = await this.walletRepository.getdoctorwallet(doctorid);
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