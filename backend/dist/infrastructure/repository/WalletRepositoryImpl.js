"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoWalletRepository = void 0;
const adminwallet_1 = require("../database/models/adminwallet");
const doctorwallet_1 = require("../database/models/doctorwallet");
const appoinment_1 = require("../database/models/appoinment");
const userwallet_1 = require("../database/models/userwallet");
class MongoWalletRepository {
    constructor() { }
    async addmoneywallet(amount, userid, doctorid, appid) {
        try {
            let wallet = await adminwallet_1.AdminWalletModel.findOne();
            const transaction = {
                type: 'credit',
                amount,
                from: userid,
                to: 'platform',
                toModel: 'Platform',
                doctorId: doctorid,
                appointmentId: appid,
                paymentstatus: false,
                date: new Date()
            };
            if (!wallet) {
                wallet = new adminwallet_1.AdminWalletModel({
                    balance: amount,
                    transactions: [transaction],
                    last_updated: new Date()
                });
            }
            else {
                wallet.balance += amount;
                wallet.transactions.push(transaction);
                wallet.lastUpdated = new Date();
            }
            await wallet.save();
            return "money added";
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
    async getdminwallet(page, limit) {
        try {
            const wallet = await adminwallet_1.AdminWalletModel.findOne();
            if (!wallet) {
                throw new Error('Admin wallet not found');
            }
            const allTransactions = wallet.transactions || [];
            const total = allTransactions.length;
            const start = (page - 1) * limit;
            const transaction = allTransactions.slice(start, start + limit);
            return {
                transaction,
                balance: wallet.balance,
                total,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
    async getRefundTransaction(appointmentId) {
        try {
            console.log(appointmentId);
            const wallet = await adminwallet_1.AdminWalletModel.findOne();
            if (!wallet) {
                throw new Error('Wallet not found');
            }
            const refundTransaction = wallet.transactions.find((item) => item.appointmentId?.toString() === appointmentId);
            if (!refundTransaction) {
                throw new Error('Refund transaction not found');
            }
            if (!refundTransaction._id) {
                throw new Error('Refund transaction not found');
            }
            return refundTransaction._id.toString();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getPayoutinfor() {
        try {
            const wallet = await adminwallet_1.AdminWalletModel.findOne().populate({
                path: 'transactions.appointmentId',
                match: {
                    status: 'completed',
                    payment_status: 'paid',
                },
            });
            if (!wallet || !wallet.transactions) {
                throw new Error('No matching wallet or transactions found');
            }
            return wallet.transactions;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getdoctorwallet(doctorId, page, limit) {
        try {
            const wallet = await doctorwallet_1.DoctorWalletModel.findOne({ doctorId });
            if (!wallet) {
                throw new Error('No matching wallet or transactions found');
            }
            const balance = wallet.balance;
            const total = wallet.transactions.length;
            const start = (page - 1) * limit;
            const end = start + limit;
            const paginatedTransactions = wallet.transactions.slice(start, end);
            return { balance, transaction: paginatedTransactions, total };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async addpaytodoctor(transactionId, doctorid) {
        try {
            const wallet = await adminwallet_1.AdminWalletModel.findOne();
            if (!wallet) {
                throw new Error('Admin wallet not found');
            }
            console.log(transactionId);
            const existingTransaction = wallet.transactions.find(txn => txn._id.toString() === transactionId);
            console.log(existingTransaction);
            if (!existingTransaction) {
                throw new Error('Transaction not found in wallet');
            }
            existingTransaction.paymentstatus = true;
            const adminDebitTransaction = {
                type: 'debit',
                amount: existingTransaction.amount - 20,
                from: 'platform',
                to: doctorid,
                toModel: 'Doctor',
                doctorId: doctorid,
                appointmentId: existingTransaction.appointmentId,
                paymentstatus: true,
                date: new Date()
            };
            wallet.balance -= existingTransaction.amount;
            wallet.transactions.push(adminDebitTransaction);
            const doctorTransaction = {
                type: 'credit',
                amount: existingTransaction.amount - 20,
                appointmentId: existingTransaction.appointmentId,
                date: new Date()
            };
            let doctorWallet = await doctorwallet_1.DoctorWalletModel.findOne({ doctorId: doctorid });
            if (!doctorWallet) {
                doctorWallet = new doctorwallet_1.DoctorWalletModel({
                    doctorId: doctorid,
                    balance: doctorTransaction.amount,
                    transactions: [doctorTransaction],
                    lastUpdated: new Date()
                });
            }
            else {
                doctorWallet.balance += doctorTransaction.amount;
                doctorWallet.transactions.push(doctorTransaction);
                doctorWallet.lastUpdated = new Date();
            }
            await wallet.save();
            await doctorWallet.save();
            console.log(wallet);
            return { message: 'Payment updated successfully' };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async addrefund(transactionId) {
        try {
            const wallet = await adminwallet_1.AdminWalletModel.findOne();
            if (!wallet) {
                throw new Error('Admin wallet not found');
            }
            const existingTransaction = wallet.transactions.find(txn => txn._id.toString() === transactionId);
            if (!existingTransaction) {
                throw new Error('Transaction not found in wallet');
            }
            existingTransaction.paymentstatus = true;
            const appoinment = await appoinment_1.AppointmentModel.findOne({ _id: existingTransaction.appointmentId });
            if (!appoinment) {
                throw new Error("Appointment not found");
            }
            const userId = appoinment.user_id;
            const adminDebitTransaction = {
                type: 'debit',
                amount: existingTransaction.amount,
                from: 'platform',
                to: userId,
                toModel: 'User',
                doctorId: existingTransaction.doctorId,
                appointmentId: existingTransaction.appointmentId,
                paymentstatus: true,
                date: new Date()
            };
            wallet.balance -= existingTransaction.amount;
            wallet.transactions.push(adminDebitTransaction);
            await wallet.save();
            const userwallettransaction = {
                type: 'credit',
                amount: existingTransaction.amount,
                date: new Date()
            };
            let userwallet = await userwallet_1.UserwalletModel.findOne({ userId: userId });
            if (!userwallet) {
                userwallet = new userwallet_1.UserwalletModel({
                    userId: userId,
                    balance: existingTransaction.amount,
                    transactions: [userwallettransaction],
                    lastUpdated: new Date()
                });
            }
            else {
                userwallet.balance += existingTransaction.amount;
                userwallet.transactions.push(userwallettransaction);
                userwallet.lastUpdated = new Date();
            }
            await userwallet.save();
            return 'money added';
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getuserwallet(userid, page, limit) {
        try {
            const userwallet = await userwallet_1.UserwalletModel.findOne({ userId: userid });
            if (!userwallet) {
                throw new Error('No wallet available');
            }
            const totalTransactions = userwallet.transactions.length;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedTransactions = userwallet.transactions.reverse()
                .slice(startIndex, endIndex);
            return {
                balance: userwallet.balance,
                transaction: paginatedTransactions,
                total: totalTransactions
            };
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async adduserwallet(id, amount) {
        try {
            const userwallet = await userwallet_1.UserwalletModel.findOne({ userId: id });
            if (!userwallet) {
                throw new Error('No wallet available');
            }
            const userwallettransaction = {
                type: 'debit',
                amount: amount,
                date: new Date()
            };
            userwallet.balance -= amount;
            userwallet.transactions.push(userwallettransaction);
            userwallet.lastUpdated = new Date();
            await userwallet.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}
exports.MongoWalletRepository = MongoWalletRepository;
