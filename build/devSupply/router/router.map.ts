import { Request, Response, NextFunction, RequestHandler } from 'express';

import appConfig from '../module/appConfig';
import logo from '../module/logo';

const moduleList = [appConfig, logo];

export type RouterModule = (req: Request, res: Response, next: NextFunction) => void;
export interface MapItem {
  url: string;
  module: (req: Request, res: Response, next: NextFunction) => void;
  method?: 'post' | 'get';
  middlewares?: Array<RequestHandler>;
}

const routers: Array<MapItem> = [];

const tempUrlList: Array<string> = [];
for (const module of moduleList) {
  for (const route of module) {
    // 检查url 冲突
    if (tempUrlList.indexOf(route.url) === -1) {
      tempUrlList.push(route.url);
      routers.push(route);
    } else {
      throw new Error(`路径冲突: ${route.url}`);
    }
  }
}

export default routers;
