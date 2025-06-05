import { Appointment } from '../../../domain/entities/appoinment';
import { WalletRepository } from '../../../domain/repository/wallet-repo';
import { AdminWallet } from '../../../domain/entities/adminwallet';

export class GetPayout {
  constructor(private walletRepository: WalletRepository) {}

  async getrpayoutInfor(): Promise<any> {
    try {
      const refunds = await this.walletRepository.getPayoutinfor();
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
