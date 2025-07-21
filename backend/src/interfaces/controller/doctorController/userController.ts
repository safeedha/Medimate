import { Request, Response, NextFunction } from 'express';
import { IGetAllSortedUsers } from '../../../domain/useCaseInterface/user/IGetAllSortedUsers';
import { HttpStatus } from '../../../common/httpStatus';
import {IUpdateMessagetime} from '../../../domain/useCaseInterface/conversation/IUpdateMessagetime';

interface CustomRequest extends Request {
  id: string;
}
export class UserManagementController {
  constructor(private getUserBysort: IGetAllSortedUsers,
         private updateMessagetime:IUpdateMessagetime
  ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = (req.query.search as string) || '';
      const users = await this.getUserBysort.getAllSortUser(search);

      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      next(error);
    }
  }
  async updatemessagetime(req: CustomRequest, res: Response, next: NextFunction):Promise<void>{
        try{
           const {id}=req
            const {reciever}=req.params         
           const result=await this.updateMessagetime.update(id!,reciever)
          res.status(201).json(result)
        }
        catch(error)
        {
            next(error)
        }
      }
}

