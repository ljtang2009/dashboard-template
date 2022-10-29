const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const dayjs = require('dayjs');
const { resolve } = require('path');
const { app } = require('electron');

const loggerFileName = resolve(
  process.cwd(),
  app.isPackaged ? './' : './src-electron',
  `./.log/${dayjs().format('YYYY-MM-DD')}.log`,
);

exports.logger = winston.createLogger({
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: loggerFileName,
    }),
  ],
});
