import { Appointment } from '../../../domain/entities/appoinment';
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import{ AdminWallet} from "../../../domain/entities/adminwallet"

export class GetAdminWallet {

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(): Promise<AdminWallet[]> {
    try {
      const wallet = await this.walletRepository.getdminwallet();
      return wallet;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}