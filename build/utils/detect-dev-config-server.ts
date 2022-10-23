import http from 'http';
import { devConfigServerPort } from '../config';

/**
 * 检查dev-config-server是否运行
 */
export default () => {
  const devConfigServerUrl = `http://127.0.0.1:${devConfigServerPort}`;
  return new Promise<void>((resolve, reject) => {
    http
      .get(devConfigServerUrl, (_res) => {
        resolve();
      })
      .on('error', (_e) => {
        reject(new Error('dev-config-server 未运行'));
      });
  });
};
