import {AdminWalletTransactionDto} from '../../../dto/wallet.dto'

export interface IGetAdminWallet {
  getwallet(page: number, limit: number): Promise<
   { transaction: AdminWalletTransactionDto[]; balance: number; total: number 
  }>;
}