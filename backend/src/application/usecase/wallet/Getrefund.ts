
import { IWalletRepository } from '../../../domain/repository/WalletRepository';

export class Getrefund {
  constructor(private _walletRepository: IWalletRepository) {}

  async getrefundable(appoinmentId:string): Promise<string> {
    try {
      const refunds = await this._walletRepository.getRefundTransaction(appoinmentId);
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
