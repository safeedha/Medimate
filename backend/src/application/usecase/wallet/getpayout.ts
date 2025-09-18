import { IGetPayout } from '../../../domain/useCaseInterface/wallet/IGetPayout';
import {IWalletRepository } from '../../../domain/repository/WalletRepository';
import{AdminWalletTransactionDto} from '../../../dto/wallet.dto'

export class GetPayout implements IGetPayout{
  constructor(private _walletRepository: IWalletRepository) {}

  async getrpayoutInfor(): Promise<AdminWalletTransactionDto[]> {
    try {
      const refunds = await this._walletRepository.getPayoutinfor();
       const allrefunds: AdminWalletTransactionDto[] =refunds
        .filter((txn) => txn.appointmentId !== null && txn.paymentstatus === false)
        .map((txn) => ({
          _id: txn._id!.toString(), 
          amount: txn.amount,
          date: txn.date.toISOString(),
          from: txn.from as string,
          to: txn.to as string,
          toModel: txn.toModel,
          type: txn.type,
          doctorId:txn.doctorId.toString(),
          paymentstatus: txn.paymentstatus,
        }));
      return allrefunds;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}
