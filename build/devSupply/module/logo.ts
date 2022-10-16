import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { upload } from '../utils/multer';
import fs from 'fs-extra';

const logoPath = path.resolve(__dirname, '../../../src/assets/logo.png');
const logoDefaultPath = path.resolve(__dirname, '../../../src/assets/logo.default.png');

/**
 * 获取Logo
 * @param _req
 * @param res
 * @param _next
 */
const get = async (_req: Request, res: Response, _next: NextFunction) => {
  res.sendFile(logoPath);
};

/**
 * 保存logo
 * @param req
 * @param res
 * @param _next
 */
const save = async (req: Request, res: Response, next: NextFunction) => {
  const ws = fs.createWriteStream(logoPath);
  ws.write(req.file?.buffer, (error) => {
    ws.close();
    if (error) {
      next(error);
    } else {
      res.end();
    }
  });
};

/**
 * 重置
 * @param _req
 * @param res
 * @param next
 */
const reset = async (_req: Request, res: Response, next: NextFunction) => {
  fs.copy(logoDefaultPath, logoPath, (error) => {
    if (error) {
      next(error);
    } else {
      res.end();
    }
  });
};

const routes = [
  {
    url: `/get`,
    module: get,
    method: 'get' as 'get',
  },
  {
    url: '/save',
    module: save,
    // 获取上传的文件
    middlewares: [upload.single('file')],
  },
  {
    url: '/reset',
    module: reset,
  },
];

const moduleName = '/logo';
for (const item of routes) {
  item.url = `${moduleName}${item.url}`;
}

export default routes;
