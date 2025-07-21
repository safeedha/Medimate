import { Request, Response, NextFunction } from "express";
import { IGetAdminWallet } from '../../../domain/useCaseInterface/wallet/IGetAdminWallet';
import { IGetPayout } from '../../../domain/useCaseInterface/wallet/IGetPayout';
import { IPayToDoctor } from '../../../domain/useCaseInterface/wallet/IPayToDoctor';
import { HttpStatus } from '../../../common/httpStatus';

export class WalletController {
  constructor(
    private getAdminWallet: IGetAdminWallet,
    private getPayout: IGetPayout,
    private payToDoctor: IPayToDoctor,
  ) {}

  async getWalletinformation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this.getAdminWallet.getwallet(page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPayoutInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getPayout.getrpayoutInfor();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async processDoctorPayout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { transactionId, doctorid } = req.body;
      const result = await this.payToDoctor.paymentToDoctor(transactionId, doctorid);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}

