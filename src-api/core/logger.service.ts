import { LoggerService, ConsoleLogger } from '@nestjs/common';
import winston, { format } from 'winston';
const { app } = require('electron');
import path from 'path';
import dayjs from 'dayjs';
import Transport from 'winston-transport';
import fs from 'fs-extra'
import os from 'os'
const { combine, timestamp, printf } = format;

enum LogLevel {
  error = 'error',
  warn = 'warn',
  log = 'info', // winston 叫 info, nest 叫 log
  verbose = 'verbose',
  debug = 'debug',
}

interface FileTransportOptions extends Transport.TransportStreamOptions {
  filename: string;
}

class FileTransport extends Transport {
  public constructor(private opts: FileTransportOptions) {
    super(opts);
  }
  public override async log(info: any, callback: () => void) {
    await fs.ensureFile(this.opts.filename)
    await fs.appendFile(this.opts.filename, `${info.timestamp} ${info.level}: ${info.message}` + os.EOL)
    callback()
  }
}

export class Logger implements LoggerService {
  private consoleLogger = new ConsoleLogger();
  public constructor(private programDir: string = './src-api') { }
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
    const loggerFileName = path.resolve(
      process.cwd(),
      app && app.isPackaged ? './' : this.programDir,
      `./.log/${dayjs().format('YYYY-MM-DD')}.log`,
    );
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      transports: [
        // 自定义日志文件传输。内置的winston.transports.File在electron更新的时候有权限问题。
        new FileTransport({
          filename: loggerFileName,
        })
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
