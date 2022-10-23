import getPort from 'get-port';
import config from './webpack/webpack.config.dev';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { devServerPort, devConfigServerPort, mockServerUrl } from './config';
import { bootstrap as launchDevConfigServer } from './dev-config-server/main';
import bootstrap from './core/bootstrap';
import detectDevConfigServer from './utils/detect-dev-config-server';
import { parseArgs } from './utils/command';

const processArgs = parseArgs();

// 手动调试dev-config-server
const isManualDevConfigServer = !!processArgs['manual-dev-config-server'];
// mock dev-config-server
const isMockDevConfigServer = !!processArgs['mock-dev-config-server'];
// mock api-server
// const isMockApiServer = !!processArgs['mock-api-server'];

const compiler = webpack(config);

const runServer = async () => {
  await bootstrap();

  let devConfigServerUrl = mockServerUrl;
  if (!isMockDevConfigServer) {
    let _devConfigServerPort = devConfigServerPort;
    if (!isManualDevConfigServer) {
      const { port: _devConfigServerPort } = await launchDevConfigServer();
    } else {
      // 检测 dev-config-server是否运行
      await detectDevConfigServer();
    }
    // HACK 如果是dev-config-server, 注意端口可能为因为被占用而改变。
    devConfigServerUrl = `http://127.0.0.1:${_devConfigServerPort}`;
  }

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
      '/dev': devConfigServerUrl,
      // '/dev': mockServerUrl,
    },
  };

  const server = new WebpackDevServer(devServerOptions, compiler);
  await server.start();
};

runServer();
