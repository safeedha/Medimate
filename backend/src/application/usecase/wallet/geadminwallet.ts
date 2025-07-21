
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import {AdminWalletTransactionDto} from '../../../dto/wallet.dto'
import { IGetAdminWallet } from '../../../domain/useCaseInterface/wallet/IGetAdminWallet';

export class GetAdminWallet implements IGetAdminWallet{

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(page:number,limit:number): Promise<{ transaction: AdminWalletTransactionDto[]; balance: number; total: number }> {
    try {
      const wallet = await this.walletRepository.getdminwallet(page,limit);
      return wallet
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}