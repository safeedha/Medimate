import { IGetUserWallet } from '../../../domain/useCaseInterface/wallet/IGetUserWallet';
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import {WalletTransactionDto} from '../../../dto/wallet.dto'
export class GetUserallet implements IGetUserWallet  {

  constructor(private walletRepository:WalletRepository) {}
  async getwallet(userid:string,page:number,limit:number): Promise<{ balance: number;  transactions: WalletTransactionDto[] }> {
    try {
      const wallet = await this.walletRepository.getuserwallet(userid,page,limit);
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