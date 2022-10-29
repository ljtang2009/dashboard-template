import { initEnv } from '@build/utils/env';
initEnv();
import getConfig from '@build/webpack/webpack.config.prod';
import webpack from 'webpack';
import bootstrap from '@build/core/bootstrap';

async function build() {
  await bootstrap();
  const webpackConfig = await getConfig();
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    if (stats) {
      console.info(
        stats.toString({
          colors: true,
          modules: false,
          entrypoints: false,
        }),
      );
    }
  });
}

build();
