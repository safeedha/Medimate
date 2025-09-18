import { Request, Response, NextFunction } from 'express';
import { createPayment } from '../../../application/service/createpayment';
import { verifypayment } from '../../../application/service/verfypayment';
import { HttpStatus } from '../../../constant/httpStatus';

interface CustomRequest extends Request {
  id: string;
}

export class PaymentController {
  constructor() {}

  async createOrder(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { amount } = req.body;
      const order = await createPayment(amount);
      res.status(HttpStatus.OK).json(order);
    } catch (error) {
      next(error);
    }
  }

  async verifyOrderPayment(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const result = await verifypayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      res.status(HttpStatus.OK).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  }
}
