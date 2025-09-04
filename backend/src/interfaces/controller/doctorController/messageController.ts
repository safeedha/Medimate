import { Request, Response, NextFunction } from 'express';
import { IGetAllMessages } from '../../../domain/useCaseInterface/conversation/IGetAllMessages';
import { IDeleteMessage } from '../../../domain/useCaseInterface/conversation/IDeleteMessage';
import { IGetUnreadCount } from '../../../domain/useCaseInterface/conversation/IGetUnreadCount';
import { HttpStatus } from '../../../common/httpStatus';
import { HttpMessage } from '../../../common/httpessages';

interface CustomRequest extends Request {
  id: string;
}

export class MessageController {
  constructor(
    private getAllMessagesUseCase: IGetAllMessages,
    private deleteMessageUseCase: IDeleteMessage,
    private getUnreadCountUseCase: IGetUnreadCount
  ) {}

  // async updateMessageTime(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { id } = req;
  //     const { reciever } = req.params;

  //     if (typeof reciever !== 'string') {
  //       res.status(HttpStatus.BAD_REQUEST).json({ message:  Messages.INVALID_RECEIVER});
  //       return;
  //     }

  //     const result = await this.getAllMessagesUseCase.update(id, reciever);
  //     res.status(HttpStatus.OK).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async fetchMessages(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { sender } = req.query;

      if (typeof sender !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).json({ message:HttpMessage.INVALID_SENDER_OR_RECEIVER });
        return;
      }

      const result = await this.getAllMessagesUseCase.getallmessage(sender, userId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { messageid } = req.params;
      const { sender, reciever } = req.query;

      if (typeof sender !== 'string' || typeof reciever !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.INVALID_SENDER_OR_RECEIVER });
        return;
      }

      const result = await this.deleteMessageUseCase.delete(messageid, sender, reciever);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchUnreadCount(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const count = await this.getUnreadCountUseCase.getcount(userId);
      res.status(HttpStatus.OK).json(count);
    } catch (error) {
      next(error);
    }
  }
}
