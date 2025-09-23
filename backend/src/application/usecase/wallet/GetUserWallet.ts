import { IGetUserWallet } from '../../../domain/useCaseInterface/wallet/IGetUserWallet';
import {IWalletRepository} from '../../../domain/repository/WalletRepository';
import {WalletTransactionDto} from '../../../dto/wallet.dto'
export class GetUserallet implements IGetUserWallet  {

  constructor(private _walletRepository:IWalletRepository) {}
  async getwallet(userid:string,page:number,limit:number): Promise<{ balance: number;  transactions: WalletTransactionDto[] ,total:number}> {
    try {
      const {balance,transaction,total} = await this._walletRepository.getuserwallet(userid,page,limit);
        const paginatedTransactions: WalletTransactionDto[] = transaction.reverse()
        .map((tx) => ({
          type: tx.type,
          amount: tx.amount,
          date: tx.date,
        }));
      return {balance,transactions:paginatedTransactions,total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}