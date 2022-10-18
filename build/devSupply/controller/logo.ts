import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { upload } from '../utils/multer';
import fs from 'fs-extra';

const logoPath = path.resolve(__dirname, '../../../src/assets/logo.png');
// const faviconPath = path.resolve(__dirname, '../../../public/logo.png'); // favicon 文件
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
 * 把buffer保存成文件
 * @param buffer
 * @param filePath
 */
const _save = async (buffer: Buffer | undefined, filePath: string) => {
  const ws = fs.createWriteStream(filePath);
  return new Promise<void>((resolve, reject) => {
    ws.write(buffer, (error) => {
      ws.close();
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

/**
 * 保存logo
 * @param req
 * @param res
 * @param _next
 */
const save = async (req: Request, res: Response, _next: NextFunction) => {
  // 如果改favicon，会造成页面刷新。（添加watch ignore无效）
  // 所以这里不改favicon, 重新build的时候，把src中的logo覆盖到public中
  // const functionList = [_save(req.file?.buffer, logoPath), _save(req.file?.buffer, faviconPath)];
  const functionList = [_save(req.file?.buffer, logoPath)];
  await Promise.all(functionList);
  res.end();
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
