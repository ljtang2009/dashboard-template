import { Request, Response, NextFunction } from 'express';
import fs from 'fs-extra';
import path from 'path';

const appConfigPath = path.resolve(__dirname, '../../../src/config/appConfig.json');

const read = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json(await fs.readJSON(appConfigPath));
};

const save = async (req: Request, res: Response, _next: NextFunction) => {
  const appConfig = await fs.readJson(appConfigPath);
  await fs.writeJson(appConfigPath, { ...appConfig, ...req.body }, { spaces: 2 });
  res.end();
};

const routes = [
  {
    url: '/read',
    module: read,
    method: 'get' as 'get',
  },
  {
    url: '/save',
    module: save,
  },
];

const moduleName = '/appConfig';
for (const item of routes) {
  item.url = `${moduleName}${item.url}`;
}
export default routes;
