import { Request, Response, NextFunction } from 'express';
import { IGetUserWallet } from '../../../domain/useCaseInterface/wallet/IGetUserWallet';
import {IAddUserWallet} from '../../../domain/useCaseInterface/wallet/IAdduserWallet';
import { HttpStatus } from '../../../common/httpStatus';
import { HttpMessage } from '../../../common/httpessages';
interface CustomRequest extends Request {
  id: string;
}

export class UserWalletController {
  constructor(private getUserWallet: IGetUserWallet,private adduserwallet:IAddUserWallet) {}

  async fetchUserWallet(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const result = await this.getUserWallet.getwallet(userId, page, limit);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
  async debitUserWallet(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const {amount}=req.body
      console.log(amount)
      await this.adduserwallet.addMoney(userId,Number(amount))
      res.status(HttpStatus.CREATED).json({message:HttpMessage.WALLET_ADDED_SUCCESS});
    } catch (error) {
      next(error);
    }
  }
}
