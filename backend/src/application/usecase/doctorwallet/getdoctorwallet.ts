
import {WalletRepository} from '../../../domain/repository/wallet-repo';
import{DoctorTransactionDTO} from '../../../dto/wallet.dto'

export class GetDoctorWallet {

  constructor(private walletRepository:WalletRepository) {}
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