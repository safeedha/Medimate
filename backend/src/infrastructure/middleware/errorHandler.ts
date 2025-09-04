import { Request, Response,NextFunction  } from 'express';
import errorLogger from '../logging/errorlogger';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction 
): void => {
   
  const errorMessage = err instanceof Error
    ? err.message
    : 'Internal Server Error';

     errorLogger.error({
    message: errorMessage,
    stack: err instanceof Error ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  res.status(500).json({
    message: errorMessage,
    
  });
};

export default errorHandler;
