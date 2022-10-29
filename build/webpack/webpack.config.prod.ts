import webpackBaseConfig from '@build/webpack/webpack.config.base';
import { ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import getPort from 'get-port';
import StylelintPlugin from 'stylelint-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

async function getConfig() {
  return merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: await getPort({ port: parseInt(process.env['ANALYZER_PORT']!, 10) }),
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
