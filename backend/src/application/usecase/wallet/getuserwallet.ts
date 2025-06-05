import { Appointment } from '../../../domain/entities/appoinment';
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import{ AdminWallet} from "../../../domain/entities/adminwallet"

export class GetUserallet {

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(userid:string): Promise<any> {
    try {
      const wallet = await this.walletRepository.getuserwallet(userid);
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