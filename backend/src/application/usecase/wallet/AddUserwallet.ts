import {IAddUserWallet} from '../../../domain/useCaseInterface/wallet/IAdduserWallet';
import {IWalletRepository} from '../../../domain/repository/WalletRepository';

export class AddUserwallet implements IAddUserWallet  {
  constructor(private _walletRepository:IWalletRepository) {}
     async addMoney(id: string, amount: number): Promise<void>{
    try {
      await this._walletRepository.adduserwallet(id,amount);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}