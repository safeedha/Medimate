
import { WalletRepository } from '../../../domain/repository/wallet-repo';

export class Getrefund {
  constructor(private walletRepository: WalletRepository) {}

  async getrefundable(appoinmentId:string): Promise<string> {
    try {
      const refunds = await this.walletRepository.getRefundTransaction(appoinmentId);
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
