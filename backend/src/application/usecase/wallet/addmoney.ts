import {IAddUserWallet} from '../../../domain/useCaseInterface/wallet/IAdduserWallet';
import {WalletRepository} from '../../../domain/repository/wallet-repo';

export class AddUserwallet implements IAddUserWallet  {
  constructor(private walletRepository:WalletRepository) {}
     async addMoney(id: string, amount: number): Promise<void>{
    try {
      await this.walletRepository.adduserwallet(id,amount);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}