import saveAppConfig from '../module/saveAppConfig';
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
];

export default routers;
