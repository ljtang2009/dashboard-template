import http from 'http';
import { devSupplyServerPort } from '../config';

/**
 * 检查dev supply是否运行
 */
export default () => {
  const devSupplyServerUrl = `http://localhost:${devSupplyServerPort}`;
  return new Promise<void>((resolve, reject) => {
    http
      .get(devSupplyServerUrl, (_res) => {
        resolve();
      })
      .on('error', (_e) => {
        reject(new Error('dev supply 服务未运行'));
      });
  });
};
