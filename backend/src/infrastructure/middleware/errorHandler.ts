import { Request, Response, NextFunction } from 'express';
import errorLogger from '../logging/errorlogger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorMessage = err instanceof Error
    ? err.message
    : 'Internal Server Error';

  errorLogger.error({
    message: errorMessage,
    method: req.method,
    url: req.originalUrl,
    stack: err.stack || '',
  });
  console.log("middleware")
  res.status(500).json({
    message: errorMessage,
    
  });
};

export default errorHandler;
