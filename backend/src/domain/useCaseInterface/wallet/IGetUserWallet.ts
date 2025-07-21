import {WalletTransactionDto} from '../../../dto/wallet.dto'

export interface IGetUserWallet {
  getwallet(id: string, page: number, limit: number): Promise<
   { balance: number;  transactions: WalletTransactionDto[],total:number }>;
}