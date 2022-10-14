import getBaseConfiguration from './webpack.config.base';
import { Configuration, WatchIgnorePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackBaseConfig = getBaseConfiguration({ envPath: path.resolve(__dirname, '../../.env.dev') });

const config: Configuration = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
    }),
    new WatchIgnorePlugin({
      // 排除配置文件，因为配置文件会被改变，从而误刷新页面
      paths: [path.resolve(__dirname, '../../src/config/appConfig.json')],
    }),
  ],
  stats: {
    preset: 'minimal',
    timings: false,
  },
});

export default config;
