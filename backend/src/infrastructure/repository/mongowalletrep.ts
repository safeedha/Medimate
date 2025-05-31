import { WalletRepository } from "../../domain/repository/wallet-repo";
import { AdminWallet, AdminWalletTransaction } from '../../domain/entities/adminwallet';
import AdminWalletModel from "../database/models/adminwallet";
import mongoose from 'mongoose';

export class MongoWalletRepository implements WalletRepository {
  constructor() {}

  async addmoneywallet(amount: number, userid: string, doctorid: string, appid: string): Promise<string> {
    try {
    
      let wallet = await AdminWalletModel.findOne();

       const transaction: AdminWalletTransaction = {
        type: 'credit',
        amount,
        from_user_id: userid,               // string
        to_doctor_id: doctorid,             // string
        appointment_id: appid,              // string
        timestamp: new Date()
      };

      if (!wallet) {
        // If no wallet document exists, create one
        wallet = new AdminWalletModel({
          balance: amount,
          transactions: [transaction],
          last_updated: new Date()
        });
      } else {
        // Update existing wallet
        wallet.balance += amount;
        wallet.transactions.push(transaction);
        wallet.last_updated = new Date();
      }

      await wallet.save();

     
      return "money added"
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

 async getdminwallet(): Promise<AdminWallet[]> {
  try {
    const wallet = await AdminWalletModel.find()
      .populate({
        path: 'transactions.from_user_id',
        model: 'User'
      })
      .populate({
        path: 'transactions.to_doctor_id',
        model: 'Doctor'
      });
    
    return wallet;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

}
