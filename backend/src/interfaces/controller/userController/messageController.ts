import { Request, Response, NextFunction } from 'express';
import { IGetAllMessages } from '../../../domain/useCaseInterface/conversation/IGetAllMessages';
import { IGetUnreadCount } from '../../../domain/useCaseInterface/conversation/IGetUnreadCount';
import { IDeleteMessage } from '../../../domain/useCaseInterface/conversation/IDeleteMessage';
import { HttpStatus } from '../../../constant/httpStatus';
import { HttpMessage } from '../../../constant/httpessages';

interface CustomRequest extends Request {
  id: string;
}

export class ConversationController {
  constructor(
    private readonly _getAllMessagesService: IGetAllMessages,
    private readonly _getUnreadCountService: IGetUnreadCount,
    private readonly _deleteMessageService: IDeleteMessage,
  ) {}

  async fetchMessages(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const receiverId = req.query.sender;
      const senderId = req.id;

      if (!receiverId || typeof receiverId !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.INVALID_RECEIVER });
        return;
      }

      const messages = await this._getAllMessagesService.getallmessage(receiverId, senderId);
      res.status(HttpStatus.OK).json(messages);
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { messageid } = req.params;
      const sender = req.query.sender;
      const receiver = req.query.reciever;

      if (typeof sender !== 'string' || typeof receiver !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.INVALID_SENDER_OR_RECEIVER });
        return;
      }

      const result = await this._deleteMessageService.delete(messageid, sender, receiver);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchUnreadMessageCount(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.id;
      const count = await this._getUnreadCountService.getcount(userId);
      res.status(HttpStatus.OK).json({ unreadCount: count });
    } catch (error) {
      next(error);
    }
  }
}
