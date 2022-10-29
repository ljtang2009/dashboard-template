import { initEnv } from '@build/utils/env';
initEnv();
import getPort from 'get-port';
import config from '@build/webpack/webpack.config.dev';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { bootstrap as launchApiServer } from '@src-api/main';
import bootstrap from '@build/core/bootstrap';
import detectApiServer from '@build/utils/detect-api-server';
import { parseArgs } from '@build/utils/command';

const processArgs = parseArgs();

// 手动调试api-server
const isManualApiServer = !!processArgs['manual-api-server'];
// mock api-server
const isMockApiServer = !!processArgs['mock-api-server'];

const compiler = webpack(config);

const runServer = async () => {
  await bootstrap();

  let apiServerUrl = process.env['MOCK_SERVER_URL'];
  if (!isMockApiServer) {
    let _apiServerPort = process.env['API_SERVER_PORT'];
    if (!isManualApiServer) {
      const { port: _apiServerPort } = await launchApiServer();
    } else {
      // 检测 api-server是否运行
      await detectApiServer();
    }
    // HACK 如果需要手动启动api-server, 注意端口可能为因为被占用而改变。
    apiServerUrl = `http://127.0.0.1:${_apiServerPort}`;
  }

  const devServerOptions: WebpackDevServer.Configuration = {
    client: {
      logging: 'info',
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    },
    hot: true, // 启用 webpack 的 热模块替换 特性
    open: true,
    port: await getPort({
      port: parseInt(process.env['DEV_SERVER_PORT']!, 10),
    }),
    proxy: {
      '/api': apiServerUrl!,
    },
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

runServer();
