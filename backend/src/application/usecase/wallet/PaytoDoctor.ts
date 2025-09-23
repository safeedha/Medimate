import { IWalletRepository } from '../../../domain/repository/WalletRepository';
import { IPayToDoctor } from '../../../domain/useCaseInterface/wallet/IPayToDoctor';

export class Paytodoctor implements IPayToDoctor{
  constructor(private _walletRepository: IWalletRepository) {}

  async paymentToDoctor(transactionId: string, doctorId: string): Promise<{ message: string }> {
    try {
      await this._walletRepository.addpaytodoctor(transactionId, doctorId);
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

