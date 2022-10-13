import routerMap from './router.map';
import { Express } from 'express';

export default function (app: Express) {
  const urlPrefix = '/dev';
  for (const item of routerMap) {
    const url = urlPrefix + item.url;
    if (item.method === 'get') {
      app.get(url, item.module);
    } else {
      app.post(url, item.module);
    }
  }
}
