import getPort from 'get-port';
import config from './webpack/webpack.config.dev';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { devServerPort, devSupplyServerPort } from './config';
import launchSupplyServer from './devSupply/dev.supply';
import bootstrap from './core/bootstrap';

// 调试dev supply
const isDebugSupply = !!process.env['DEBUG_SUPPLY'];

const compiler = webpack(config);

const runServer = async () => {
  await bootstrap();
  let _devSupplyServerPort = devSupplyServerPort;
  if (!isDebugSupply) {
    const { port: _devSupplyServerPort } = await launchSupplyServer();
  }
  // HACK 如果是debug supply, 注意端口可能为因为被占用而改变。

  const devServerOptions: WebpackDevServer.Configuration = {
    client: {
      logging: 'info',
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    },
    hot: true, // 启用 webpack 的 热模块替换 特性
    open: true,
    port: await getPort({
      port: devServerPort,
    }),
    proxy: {
      '/dev': `http://localhost:${_devSupplyServerPort}`,
    },
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

runServer();
