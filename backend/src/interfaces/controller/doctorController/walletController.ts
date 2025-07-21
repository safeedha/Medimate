import { Request, Response, NextFunction } from 'express';
import { IGetDoctorWallet } from '../../../domain/useCaseInterface/wallet/IGetDoctorWallet';
import { HttpStatus } from '../../../common/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class DoctorWalletController {
  constructor(private getDoctorWalletUseCase: IGetDoctorWallet) {}

  async getWalletTransactions(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.id;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);

      const walletTransactions = await this.getDoctorWalletUseCase.getwallet(doctorId, page, limit);

      res.status(HttpStatus.OK).json(walletTransactions);
    } catch (error) {
      next(error);
    }
  }
}

