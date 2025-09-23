
import {IWalletRepository} from '../../../domain/repository/WalletRepository';
import{DoctorTransactionDTO} from '../../../dto/wallet.dto'
export class GetDoctorWallet {

  constructor(private _walletRepository:IWalletRepository) {}
  async getwallet(doctrid:string,page:number,limit:number): Promise<{ balance: number; transactions: DoctorTransactionDTO[]; total: number }> {
    try {
      const { balance, transaction , total} = await this._walletRepository.getdoctorwallet(doctrid,page,limit);
          const transactions: DoctorTransactionDTO[] = transaction.map((txn) => ({
            type: txn.type,
            amount: txn.amount,
            appointmentId: txn.appointmentId?.toString(),
            date: txn.date,
          }));
      return {balance ,transactions,total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}