
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import {AdminWalletTransactionDto} from '../../../dto/wallet.dto'


export class GetAdminWallet {

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