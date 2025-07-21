export interface IAddUserWallet {
  addMoney(id: string, amount: number): Promise<void>;
}
