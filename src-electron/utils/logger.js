/* eslint-disable @typescript-eslint/explicit-member-accessibility */
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const Transport = require('winston-transport');
const fs = require('fs-extra');
const os = require('os');
const dayjs = require('dayjs');
const { resolve } = require('path');
const { app } = require('electron');

const loggerFileName = resolve(
  process.cwd(),
  app.isPackaged ? './' : './src-electron',
  `./.log/${dayjs().format('YYYY-MM-DD')}.log`,
);

class FileTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.opts = opts;
  }
  async log(info, callback) {
    await fs.ensureFile(this.opts.filename);
    await fs.appendFile(this.opts.filename, `${info.timestamp} ${info.level}: ${info.message}` + os.EOL);
    callback();
  }
}

exports.logger = winston.createLogger({
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    // 自定义日志文件传输。内置的winston.transports.File在electron更新的时候有权限问题。
    new FileTransport({
      filename: loggerFileName,
    }),
  ],
});
