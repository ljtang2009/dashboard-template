import routerMap, { RouterModule } from './router.map';
import { Express, RequestHandler } from 'express';

export default function (app: Express) {
  // 开发服务前缀
  const urlPrefix = '/dev';
  for (const item of routerMap) {
    const url = urlPrefix + item.url;
    // 中间键
    if (!item.middlewares) {
      item.middlewares = [];
    }
    const params: [string, ...RequestHandler[], RouterModule] = [url, ...item.middlewares, item.module];
    let func = app.post;
    if (item.method === 'get') {
      func = app.get;
    }
    // @ts-ignore
    func.call(app, ...params);
  }
}
