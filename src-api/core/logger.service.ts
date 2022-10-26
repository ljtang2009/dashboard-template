import { LoggerService, ConsoleLogger } from '@nestjs/common';
import winston, { format } from 'winston';
import path from 'path';
import dayjs from 'dayjs';
const { combine, timestamp, printf } = format;

enum LogLevel {
  error = 'error',
  warn = 'warn',
  log = 'info', // winston 叫 info, nest 叫 log
  verbose = 'verbose',
  debug = 'debug',
}

export class Logger implements LoggerService {
  private consoleLogger = new ConsoleLogger();
  /**
   * Write a 'log' level log.
   */
  public log(message: any, ...optionalParams: any[]) {
    this.consoleLogger.log(message, ...optionalParams);
    this.record({
      level: LogLevel.log,
      message,
      optionalParams,
    });
  }

  /**
   * Write an 'error' level log.
   */
  public error(message: any, ...optionalParams: any[]) {
    this.consoleLogger.error(message, ...optionalParams);
    this.record({
      level: LogLevel.error,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'warn' level log.
   */
  public warn(message: any, ...optionalParams: any[]) {
    this.consoleLogger.warn(message, ...optionalParams);
    this.record({
      level: LogLevel.warn,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'debug' level log.
   */
  public debug?(message: any, ...optionalParams: any[]) {
    this.consoleLogger.debug(message, ...optionalParams);
    this.record({
      level: LogLevel.debug,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'verbose' level log.
   */
  public verbose?(message: any, ...optionalParams: any[]) {
    this.consoleLogger.debug(message, ...optionalParams);
    this.record({
      level: LogLevel.verbose,
      message,
      optionalParams,
    });
  }
  private record = (params: { level: LogLevel; message: any; optionalParams: any[] }) => {
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.File({
          filename: path.resolve(process.cwd(), `./src-api/.log/${dayjs().format('YYYY-MM-DD')}.log`),
        }),
      ],
    });
    let message = '';
    if (params.optionalParams.length > 0) {
      message += `[${params.optionalParams[0]}] `;
    }
    if (typeof params.message === 'object') {
      if (params.message instanceof Error) {
        message = JSON.stringify({
          message: params.message.message,
          stack: params.message.stack,
        });
      } else {
        message += JSON.stringify(params.message);
      }
    } else {
      message += params.message;
    }
    logger.log({
      level: params.level,
      message,
    });
  };
}
