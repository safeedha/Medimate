import { Appointment } from '../../../domain/entities/appoinment';
import { WalletRepository } from '../../../domain/repository/wallet-repo';
import { AdminWallet } from '../../../domain/entities/adminwallet';

export class Getrefund {
  constructor(private walletRepository: WalletRepository) {}

  async getrefundable(): Promise<any> {
    try {
      const refunds = await this.walletRepository.getRefundTransactions();

      
      return refunds;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
