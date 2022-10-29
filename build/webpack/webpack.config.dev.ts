import webpackBaseConfig from '@build/webpack/webpack.config.base';
import {
  Configuration,
  //  WatchIgnorePlugin
} from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
    }),
    // 因为 webpack-dev-server 配置 watchFiles 没有效果，所以用这个plus
    // new WatchIgnorePlugin({
    //   paths: [
    //     // path.resolve(process.cwd(), './src/config/appConfig.json'), // 排除配置文件，因为配置文件会被改变，从而误刷新页面
    //   ],
    // }),
  ],
  stats: {
    preset: 'minimal',
    timings: false,
  },
});

export default config;
