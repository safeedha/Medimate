import { IGetPayout } from '../../../domain/useCaseInterface/wallet/IGetPayout';
import { WalletRepository } from '../../../domain/repository/wallet-repo';
import{AdminWalletTransactionDto} from '../../../dto/wallet.dto'

export class GetPayout implements IGetPayout{
  constructor(private walletRepository: WalletRepository) {}

  async getrpayoutInfor(): Promise<AdminWalletTransactionDto[]> {
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
