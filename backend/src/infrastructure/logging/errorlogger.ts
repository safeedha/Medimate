// import winston from 'winston';
// import path from 'path';

// const errorLogger = winston.createLogger({
//   level: 'error',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: path.join(__dirname, '../../../logs/error.log'),
//       level: 'error'
//     }),
//     new winston.transports.Console()
//   ],
// });

// export default errorLogger;

// src/infrastructure/logging/errorLogger.ts
// src/infrastructure/logging/errorLogger.ts
// src/infrastructure/logging/errorLogger.ts
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(__dirname, '../../../logs');

// ✅ Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// ✅ Create transport array
const transports: winston.transport[] = [
  new DailyRotateFile({
    filename: 'error-%DATE%.log',
    dirname: logDirectory,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  })
];




const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

export default errorLogger;
