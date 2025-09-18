
import {IWalletRepository} from '../../../domain/repository/WalletRepository';
import {AdminWalletTransactionDto} from '../../../dto/wallet.dto'
import { IGetAdminWallet } from '../../../domain/useCaseInterface/wallet/IGetAdminWallet';
import { AdminWalletTransaction } from '../../../domain/entities/Adminwallet';

export class GetAdminWallet implements IGetAdminWallet{

  constructor(private _walletRepository:IWalletRepository) {}
  async getwallet(page:number,limit:number): Promise<{ transaction: AdminWalletTransactionDto[]; balance: number; total: number }> {
    try {
      const wallet = await this._walletRepository.getdminwallet(page,limit);
      const transaction= wallet.transaction.map((txn:AdminWalletTransaction) => ({
      _id: txn._id!,
      amount: txn.amount,
      from: txn.from as string,
      to: txn.to as string,
      toModel:txn.toModel,
      type: txn.type,
      date: txn.date.toISOString(),
    }));
      return{
        transaction,
        balance:wallet.balance,
        total:wallet.balance
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}