import http from 'http';

/**
 * 检查dev-config-server是否运行
 */
export default () => {
  const devConfigServerUrl = `http://127.0.0.1:${process.env['API_SERVER_PORT']}`;
  return new Promise<void>((resolve, reject) => {
    http
      .get(devConfigServerUrl, (_res) => {
        resolve();
      })
      .on('error', (_e) => {
        reject(new Error('api-server 未运行'));
      });
  });
};
