import { Request, Response, NextFunction } from 'express';
import { GetsingleUser } from '../../../application/usecase/user/getSingleUser';
import { IUpdateUser } from '../../../domain/useCaseInterface/user/IUpdateUser';
import { HttpStatus } from '../../../common/httpStatus';
import { Messages } from '../../../common/messages';
interface CustomRequest extends Request {
  id: string;
}

export class UserProfileController {
  constructor(
    private getSingleUserService: GetsingleUser,
    private updateUserService: IUpdateUser
  ) {}

  async fetchUserDetails(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("reuest hit")
      const userId = req.id;
      const user = await this.getSingleUserService.getsingleUser(userId);
      console.log(user)
      res.status(HttpStatus.OK).json({ message: Messages.USER_FETCH_SUCCESS, user });
    } catch (error) {
      next(error);
    }
  }

  async updateUserDetails(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { firstname, lastname, phone, age, gender } = req.body;
      await this.updateUserService.updatesingleUser(userId, firstname, lastname, phone, age, gender);
      res.status(HttpStatus.OK).json({ message: Messages.USER_UPDATE_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
}
