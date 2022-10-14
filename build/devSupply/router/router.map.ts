// import saveAppConfig from '../module/saveAppConfig';
import { save as saveAppConfig, read as readAppConfig } from '../module/appConfig';
import { Request, Response, NextFunction } from 'express';

export interface mapItem {
  url: string;
  module: (req: Request, res: Response, next: NextFunction) => void;
  method?: 'post' | 'get';
}

const routers: Array<mapItem> = [
  {
    url: `/saveAppConfig`,
    module: saveAppConfig,
  },
  {
    url: `/readAppConfig`,
    module: readAppConfig,
    method: 'get',
  },
];

export default routers;
