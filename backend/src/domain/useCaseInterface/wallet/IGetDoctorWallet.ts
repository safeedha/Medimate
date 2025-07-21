import{DoctorTransactionDTO} from '../../../dto/wallet.dto'

export interface IGetDoctorWallet {
  getwallet(Id: string, page: number, limit: number): Promise<{ balance: number; transaction: DoctorTransactionDTO[]; total: number }>;
}