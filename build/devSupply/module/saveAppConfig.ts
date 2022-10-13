import { Request, Response, NextFunction } from 'express';
import fs from 'fs-extra';
import path from 'path';

export default async (req: Request, res: Response, _next: NextFunction) => {
  const appConfigPath = path.resolve(__dirname, '../../../src/config/app.json');
  const appConfig = await fs.readJson(appConfigPath);
  await fs.writeJson(appConfigPath, { ...appConfig, ...req.body }, { spaces: 2 });
  res.end();
};
