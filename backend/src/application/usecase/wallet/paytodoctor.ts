import { WalletRepository } from '../../../domain/repository/wallet-repo';
import{AdminWalletTransactionDto} from '../../../dto/wallet.dto'
import { IPayToDoctor } from '../../../domain/useCaseInterface/wallet/IPayToDoctor';

export class Paytodoctor implements IPayToDoctor{
  constructor(private walletRepository: WalletRepository) {}

  async paymentToDoctor(transactionId: string, doctorId: string): Promise<{ message: string }> {
    try {
      await this.walletRepository.addpaytodoctor(transactionId, doctorId);
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

