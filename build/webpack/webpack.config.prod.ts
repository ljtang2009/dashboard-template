import getBaseConfiguration from '@build/webpack/webpack.config.base';
import { ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import { analyzerPort } from '@build/config';
import getPort from 'get-port';
import StylelintPlugin from 'stylelint-webpack-plugin';
import path from 'path';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackBaseConfig = getBaseConfiguration({ envPath: path.resolve(process.cwd(), './.env') });

async function getConfig() {
  return merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: await getPort({ port: analyzerPort }),
        openAnalyzer: false,
      }),
      new ProgressPlugin(),
      new ESLintPlugin({
        extensions: ['vue', 'js', 'jsx', 'cjs', 'mjs', 'ts', 'tsx', 'cts', 'mts'],
      }),
      new StylelintPlugin({
        extensions: ['css', 'less', 'scss', 'sass'],
      }),
      new MiniCssExtractPlugin({
        filename: 'style/[name].[contenthash].css',
      }),
    ],
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
  });
}

export default getConfig;
