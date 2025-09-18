import { Request, Response, NextFunction } from 'express';
import { IGetAllMessages } from '../../../domain/useCaseInterface/conversation/IGetAllMessages';
import { IDeleteMessage } from '../../../domain/useCaseInterface/conversation/IDeleteMessage';
import { IGetUnreadCount } from '../../../domain/useCaseInterface/conversation/IGetUnreadCount';
import { HttpStatus } from '../../../constant/httpStatus';
import { HttpMessage } from '../../../constant/httpessages';

interface CustomRequest extends Request {
  id: string;
}

export class MessageController {
  constructor(
    private readonly _getAllMessagesUseCase: IGetAllMessages,
    private readonly _deleteMessageUseCase: IDeleteMessage,
    private readonly _getUnreadCountUseCase: IGetUnreadCount
  ) {}

  async fetchMessages(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const { sender } = req.query;

      if (typeof sender !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.INVALID_SENDER_OR_RECEIVER });
        return;
      }

      const result = await this._getAllMessagesUseCase.getallmessage(sender, userId);
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

      const result = await this._deleteMessageUseCase.delete(messageid, sender, reciever);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchUnreadCount(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const count = await this._getUnreadCountUseCase.getcount(userId);
      res.status(HttpStatus.OK).json(count);
    } catch (error) {
      next(error);
    }
  }
}
