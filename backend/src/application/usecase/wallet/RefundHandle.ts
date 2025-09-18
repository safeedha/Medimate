import { IWalletRepository } from '../../../domain/repository/WalletRepository';

export class Refundhandle {
  constructor(private _walletRepository: IWalletRepository) {}

  async refundhandler(transactionId: string): Promise<{ message: string }> {
    try {
      await this._walletRepository.addrefund(transactionId);
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

