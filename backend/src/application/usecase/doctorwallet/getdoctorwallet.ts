
import {IWalletRepository} from '../../../domain/repository/WalletRepository';
import{DoctorTransactionDTO} from '../../../dto/wallet.dto'
import { IGetDoctorWallet } from '../../../domain/useCaseInterface/wallet/IGetDoctorWallet';

export class GetDoctorWallet implements IGetDoctorWallet{

  constructor(private walletRepository:IWalletRepository) {}
  async getwallet(doctorid:string,page:number,limit:number): Promise<{ balance: number; transaction: DoctorTransactionDTO[]; total: number }> {
    try {
      const wallet = await this.walletRepository.getdoctorwallet(doctorid,page,limit);
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