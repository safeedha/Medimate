import { WalletRepository } from "../../domain/repository/wallet-repo";
import { AdminWallet, AdminWalletTransaction } from '../../domain/entities/adminwallet';
import {AdminWalletModel} from "../database/models/adminwallet";
import {DoctorWalletModel} from "../database/models/doctorwallet";
import{Transaction} from '../../domain/entities/doctorwallet';
import { AppointmentModel} from '../database/models/appoinment';
import {UserwalletModel} from "../database/models/userwallet";
import mongoose from 'mongoose';

export class MongoWalletRepository implements WalletRepository {
  constructor() {}

  async addmoneywallet(amount: number, userid: string, doctorid: string, appid: string): Promise<string> {
    try {
    
      let wallet = await AdminWalletModel.findOne();

       const transaction: AdminWalletTransaction = {
        type: 'credit',
        amount,
        from: userid,               // string
        to: 'platform',
        toModel:'Platform',
        doctorId:doctorid ,            // string
        appointmentId: appid, 
        paymentstatus:false,             // string
        date: new Date()
      };

      if (!wallet) {
        wallet = new AdminWalletModel({
          balance: amount,
          transactions: [transaction],
          last_updated: new Date()
        });
      } else {

        wallet.balance += amount;
        wallet.transactions.push(transaction);
        wallet.lastUpdated = new Date();
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

 async getdminwallet(): Promise<any> {
  try {
    const wallet = await AdminWalletModel.find().populate({path:'transactions.doctorId'})
    return wallet
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async getRefundTransactions():Promise<any>
{
  try {
     const wallet = await AdminWalletModel.findOne({'transactions.paymentstatus':false}).populate({
      path: 'transactions.appointmentId',
      match: { status: 'cancelled', payment_status: 'paid' },
    });
    if (!wallet) {
      throw new Error('No wallet found');
    
    }
     const filteredTransactions = wallet.transactions.filter(txn => txn.appointmentId !== null);
    return filteredTransactions
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

async getPayoutinfor(): Promise<any[]> {
  try {
    const wallet = await AdminWalletModel.findOne().populate({
      path: 'transactions.appointmentId',
      match: {
        status: 'completed',
        payment_status: 'paid',
      },
    });

    if (!wallet || !wallet.transactions) {
      throw new Error('No matching wallet or transactions found');
    }

    const filteredTransactions = wallet.transactions.filter(
      (txn: any) => txn.paymentstatus === false && txn.appointmentId !== null
    );

    return filteredTransactions;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}



async getdoctorwallet(doctorId:string):Promise<any>{
  try{
    const wallet=await DoctorWalletModel.findOne({doctorId:doctorId})
    if(!wallet)
    {
       throw new Error('No matching wallet or transactions found');
    }
    return wallet
  }
  catch(error)
  {
     if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

async addpaytodoctor(transactionId: string, doctorid: string): Promise<{ message: string }> {
  try {
   

    const wallet = await AdminWalletModel.findOne();
    if (!wallet) {
      throw new Error('Admin wallet not found');
    }
    console.log(transactionId)
    const existingTransaction = wallet.transactions.find(
      txn => txn._id!.toString() === transactionId
    );
    console.log(existingTransaction)
    if (!existingTransaction) {
      throw new Error('Transaction not found in wallet');
    }
    existingTransaction.paymentstatus = true;
   
    const adminDebitTransaction = {
      type: 'debit' as 'debit',
      amount: existingTransaction.amount - 20,
      from: 'platform',
      to: doctorid,
      toModel:'Doctor',
      doctorId: doctorid,
      appointmentId: existingTransaction.appointmentId,
      paymentstatus: true,
      date: new Date()
    };
   wallet.balance-= existingTransaction.amount
   wallet.transactions.push(adminDebitTransaction);


      const doctorTransaction = {
      type: 'credit' as 'credit',
      amount: existingTransaction.amount - 20,
      appointmentId: existingTransaction.appointmentId,
      date: new Date()
    };

    let doctorWallet = await DoctorWalletModel.findOne({ doctorId: doctorid });

    if (!doctorWallet) {
      doctorWallet = new DoctorWalletModel({
        doctorId: doctorid,
        balance: doctorTransaction.amount,
        transactions: [doctorTransaction],
        lastUpdated: new Date()
      });
    } else {
      doctorWallet.balance += doctorTransaction.amount;
      doctorWallet.transactions.push(doctorTransaction);
      doctorWallet.lastUpdated = new Date();
    }

   await wallet.save();
   await doctorWallet.save();
  console.log(wallet)
    return { message: 'Payment updated successfully' };

  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}


async addrefund(transactionId:string):Promise<string> {
  try{
        const wallet = await AdminWalletModel.findOne();
    if (!wallet) {
      throw new Error('Admin wallet not found');
    }

    const existingTransaction = wallet.transactions.find(
      txn => txn._id!.toString() === transactionId
    );
    if (!existingTransaction) {
      throw new Error('Transaction not found in wallet');
    }
    existingTransaction.paymentstatus=true
   const appoinment=await AppointmentModel.findOne({_id:existingTransaction.appointmentId})
   if (!appoinment) {
      throw new Error("Appointment not found");
    }
   let userId=appoinment.user_id
     const adminDebitTransaction = {
      type: 'debit' as 'debit',
      amount: existingTransaction.amount ,
      from: 'platform',
      to: userId,
      toModel:'User',
      doctorId: existingTransaction.doctorId,
      appointmentId: existingTransaction.appointmentId,
      paymentstatus: true,
      date: new Date()
    };
    wallet.balance-= existingTransaction.amount
    wallet.transactions.push(adminDebitTransaction);
     await wallet.save();
     let userwallettransaction={
       type:'credit' as 'credit',
       amount:existingTransaction.amount,
       date:new Date()
     }
     let userwallet = await UserwalletModel.findOne({ userId: userId });

      if (!userwallet) {
        userwallet = new UserwalletModel({
          userId: userId,
          balance: existingTransaction.amount,
          transactions: [userwallettransaction],
          lastUpdated:new Date()
        });
      } else {

        userwallet.balance += existingTransaction.amount;
        userwallet.transactions.push(userwallettransaction);
        userwallet.lastUpdated = new Date()
      }
   await userwallet.save();
    return 'money added'
  }
  catch(error)
  {
    if (error instanceof Error) {
      console.log(error)
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

async getuserwallet(userid:string):Promise<any>{
  try{
   const userwallet=await UserwalletModel.findOne({userId:userid})
   if(!userwallet)
   {
    throw new Error('no wallet available')
   }
   return userwallet
  }
 catch(error)
  {
    if (error instanceof Error) {
      console.log(error)
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}


}
