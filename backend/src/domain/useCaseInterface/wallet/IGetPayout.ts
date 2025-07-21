import{AdminWalletTransactionDto} from '../../../dto/wallet.dto'
export interface IGetPayout {
  getrpayoutInfor(): Promise<AdminWalletTransactionDto[]>;
}