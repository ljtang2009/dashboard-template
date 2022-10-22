import getPort from 'get-port';
import config from './webpack/webpack.config.dev';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { devServerPort, devSupplyServerPort } from './config';
import { bootstrap as launchSupplyServer } from './devSupply/main';
import bootstrap from './core/bootstrap';
import detectDevSupply from './utils/detectDevSupply';

// 调试dev supply
const isDebugSupply = !!process.env['DEBUG_SUPPLY'];

const compiler = webpack(config);

const runServer = async () => {
  await bootstrap();
  let _devSupplyServerPort = devSupplyServerPort;
  if (!isDebugSupply) {
    const { port: _devSupplyServerPort } = await launchSupplyServer();
  } else {
    // 检测 dev supply是否运行
    await detectDevSupply();
  }
  // HACK 如果是debug supply, 注意端口可能为因为被占用而改变。

  // const mockServerUrl = 'http://127.0.0.1:4523/m1/1773693-0-default';  // mock服务

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
      // '/dev': mockServerUrl,
    },
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

runServer();
