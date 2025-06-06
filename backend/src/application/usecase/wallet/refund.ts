import { WalletRepository } from '../../../domain/repository/wallet-repo';

export class Refundhandle {
  constructor(private walletRepository: WalletRepository) {}

  async refundhandler(transactionId: string): Promise<{ message: string }> {
    try {
      await this.walletRepository.addrefund(transactionId);
      return { message: 'Payment updated' };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

