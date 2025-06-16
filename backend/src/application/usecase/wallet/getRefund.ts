import { Appointment } from '../../../domain/entities/appoinment';
import { WalletRepository } from '../../../domain/repository/wallet-repo';
import { AdminWallet } from '../../../domain/entities/adminwallet';
import{AdminWalletTransactionDto} from '../../../dto/wallet.dto'
export class Getrefund {
  constructor(private walletRepository: WalletRepository) {}

  async getrefundable(): Promise<AdminWalletTransactionDto[]> {
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
