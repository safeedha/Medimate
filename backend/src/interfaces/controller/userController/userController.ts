import { Request, Response, NextFunction } from 'express';
import { IGetSingleUser } from '../../../domain/useCaseInterface/user/IGetSingleUser';
import { IUpdateUser } from '../../../domain/useCaseInterface/user/IUpdateUser';
import { HttpStatus } from '../../../constant/httpStatus';
import { HttpMessage } from '../../../constant/httpessages';

interface CustomRequest extends Request {
  id: string;
}

export class UserProfileController {
  constructor(
    private readonly _getSingleUserService: IGetSingleUser,
    private readonly _updateUserService: IUpdateUser
  ) {}

  async fetchUserDetails(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("request hit");
      const userId = req.id;
      const user = await this._getSingleUserService.getsingleUser(userId);
      console.log(user);
      res.status(HttpStatus.OK).json({ message: HttpMessage.USER_FETCH_SUCCESS, user });
    } catch (error) {
      next(error);
    }
  }

  async updateUserDetails(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { firstname, lastname, phone, age, gender } = req.body;
      await this._updateUserService.updatesingleUser(userId, firstname, lastname, phone, age, gender);
      res.status(HttpStatus.OK).json({ message: HttpMessage.USER_UPDATE_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
}
