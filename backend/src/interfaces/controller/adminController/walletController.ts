import { Request, Response, NextFunction } from "express";
import { IGetAdminWallet } from "../../../domain/useCaseInterface/wallet/IGetAdminWallet";
import { IGetPayout } from "../../../domain/useCaseInterface/wallet/IGetPayout";
import { IPayToDoctor } from "../../../domain/useCaseInterface/wallet/IPayToDoctor";
import { HttpStatus } from "../../../constant/httpStatus";

export class WalletController {
  constructor(
    private readonly _getAdminWallet: IGetAdminWallet,
    private readonly _getPayout: IGetPayout,
    private readonly _payToDoctor: IPayToDoctor
  ) {}

  async getWalletInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10);
      const limit = parseInt(req.query.limit as string, 10);
      const result = await this._getAdminWallet.getwallet(page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPayoutInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getPayout.getrpayoutInfor();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async processDoctorPayout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { transactionId, doctorid } = req.body;
      const result = await this._payToDoctor.paymentToDoctor(transactionId, doctorid);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
